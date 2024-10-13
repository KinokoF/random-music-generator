import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import {
  Clock,
  IcosahedronGeometry,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three/src/Three.js';
import { PlayerService } from './player.service';

// TODO: rivedere
@Injectable({
  providedIn: 'root',
})
export class VisualizerService {
  private vertex: string | undefined;
  private fragment: string | undefined;
  private renderer: WebGLRenderer | undefined;
  private camera: PerspectiveCamera | undefined;
  private geo: IcosahedronGeometry | undefined;
  private mat: ShaderMaterial | undefined;
  private uniforms: any | undefined;
  private scene: Scene | undefined;
  private clock: Clock | undefined;
  private lastAnalValues: number[] | undefined;
  private stopped = true;
  private startTimeout: number | undefined;

  constructor(private playerService: PlayerService, private http: HttpClient) {}

  init(): void {
    forkJoin([
      this.http.get('vertex', { responseType: 'text' }),
      this.http.get('fragment', { responseType: 'text' }),
    ]).subscribe(([vertex, fragment]) => {
      this.vertex = vertex;
      this.fragment = fragment;
    });
  }

  start(canvas: HTMLCanvasElement): void {
    if (this.vertex && this.fragment) {
      this.lastAnalValues = [];

      this.renderer = new WebGLRenderer({ antialias: true, canvas });
      this.resize(canvas.clientWidth, canvas.clientHeight);
      this.renderer.setClearAlpha(0);

      this.camera = new PerspectiveCamera();
      this.camera.position.z = 12;

      this.geo = new IcosahedronGeometry(4, 20);

      this.uniforms = {
        u_time: { type: 'f', value: 0.0 },
        u_frequency: { type: 'f', value: 0.0 },
        u_red: { type: 'f', value: 0 },
        u_green: { type: 'f', value: 0.87 },
        u_blue: { type: 'f', value: 0.87 },
      };

      this.mat = new ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: this.vertex!,
        fragmentShader: this.fragment!,
      });

      const mesh = new Mesh(this.geo, this.mat);
      mesh.material.wireframe = true;

      this.scene = new Scene();
      this.scene.add(mesh);

      this.clock = new Clock();

      this.stopped = false;
      this.render();
    } else {
      this.startTimeout = setTimeout(() => {
        this.start(canvas);
      }, 100) as any;
    }
  }

  private render(): void {
    this.uniforms.u_time.value = this.clock!.getElapsedTime();

    const anal = this.playerService.getAnal();

    const waveData = new Float32Array(anal.frequencyBinCount);
    anal.getFloatTimeDomainData(waveData);

    const avg = waveData.reduce((a, c) => a + Math.abs(c), 0) / waveData.length;

    this.lastAnalValues!.push(avg);

    if (this.lastAnalValues!.length > 10) {
      this.lastAnalValues!.shift();
    }

    const avgAvg =
      this.lastAnalValues!.reduce((a, c) => a + c, 0) /
      this.lastAnalValues!.length;

    this.uniforms.u_frequency.value = avgAvg * 600;
    this.renderer!.render(this.scene!, this.camera!);

    if (!this.stopped) {
      requestAnimationFrame(() => this.render());
    }
  }

  resize(width: number, height: number): void {
    this.renderer?.setSize(width, height, false);
  }

  stop(): void {
    this.stopped = true;
    clearTimeout(this.startTimeout);
    setTimeout(() => {
      this.renderer?.dispose();
      this.geo?.dispose();
      this.mat?.dispose();
      this.clock?.stop();
      this.renderer = undefined;
      this.camera = undefined;
      this.geo = undefined;
      this.mat = undefined;
      this.uniforms = undefined;
      this.scene = undefined;
      this.clock = undefined;
      this.lastAnalValues = undefined;
      this.startTimeout = undefined;
    }, 100);
  }
}
