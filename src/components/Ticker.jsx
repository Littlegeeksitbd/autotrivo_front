import React from 'react';

const Ticker = () => {
    const TICKER_ITEMS = ["BAJIBD","NEXTBAJI","KRIKIYA","MCW LETEST","CRICKEX","CK444","YESB","DARAZPLAY","BIGTAKA","WINBAJI","KHELAGHOR","SUPERBAJI","BAJILIVE","AGUN88"];
    const items=[...TICKER_ITEMS,...TICKER_ITEMS,...TICKER_ITEMS];
    return (
        <div id="ticker" className="ticker">
            <div className="ticker__track">{items.map((t,i)=><span key={i} className="ticker__item">• {t}</span>)}</div>
        </div>
    );
};

export default Ticker;
