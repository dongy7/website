import Terminal from 'react-animated-term'

export default () => {
  const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  const spinnerLines = [
    {
      text: 'node example.js',
      cmd: true,
      delay: 80,
    },
    {
      text: '✔ Done',
      cmd: false,
      repeat: true,
      repeatCount: 2,
      frames: spinnerFrames.map(function(spinner) {
        return {
          text: spinner + ' Running...',
          delay: 80,
        }
      }),
    },
    {
      text: '',
      cmd: true,
    },
  ]
  return <Terminal lines={spinnerLines} interval={40} height={60} />
}
