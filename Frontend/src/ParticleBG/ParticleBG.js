import particlesConfig from "./particleBGConfig";
import React from "react";
import Particles from "react-particles";
import { Engine } from "tsparticles-engine";
import { loadLinksPreset } from "tsparticles-preset-links";

export class ParticleBG extends React.PureComponent<IProps> {
  // this customizes the component tsParticles installation
  async customInit(engine: Engine): Promise<void> {
    // this adds the preset to tsParticles, you can safely use the
    await loadLinksPreset(engine);
  }

  render() {
    return <Particles options={particlesConfig} init={this.customInit} />;
  }
}

export default ParticleBG