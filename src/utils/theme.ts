// Returns a gradient background color for a given episode_id
export function episodeGradient(episode?: number): string | undefined {
    switch (episode) {
      case 1: return 'linear-gradient(180deg, #24112e, #0f0c24)'
      case 2: return 'linear-gradient(180deg, #13222c, #0b1016)'
      case 3: return 'linear-gradient(180deg, #2c1414, #0f0a0a)'
      case 4: return 'linear-gradient(180deg, #1d2a1f, #0d130e)'
      case 5: return 'linear-gradient(180deg, #1b2434, #0a0f18)'
      case 6: return 'linear-gradient(180deg, #2e2612, #131008)'
      case 7: return 'linear-gradient(180deg, #22222c, #101017)'
      case 8: return 'linear-gradient(180deg, #1f1c2c, #0b0a12)'
      case 9: return 'linear-gradient(180deg, #261b1f, #110c0e)'
      default: return undefined
    }
  }
  