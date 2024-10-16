import { useEffect, useRef, memo } from 'react'

function TradingViewChart({ coinSymbol, selectedCurrency}) {
  const container = useRef()

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = ''
    }
    const coin = coinSymbol + selectedCurrency

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${coin}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
    container.current.appendChild(script)

    return () => {
      if (container.current) {
        container.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className='my-2' ref={container} style={{ height: '100%', width: '100%' }}>
      <div style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
    </div>
  )
}

export default memo(TradingViewChart)
