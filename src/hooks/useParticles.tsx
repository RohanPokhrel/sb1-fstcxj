import { useCallback } from 'react';
import { loadSlim } from '@tsparticles/slim';
import { Particles } from '@tsparticles/react';
import type { Engine } from '@tsparticles/engine';

export function useParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const ParticlesComponent = () => (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          opacity: 0,
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );

  return { ParticlesComponent };
}