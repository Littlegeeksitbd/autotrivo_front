import React from 'react';
import SectionHeader from "./layout/SectionHeader.jsx";

const Specs = () => {
    const SPEC_COLS = ["NEXTBAJI","MCW","SUPERBAJI","CRICKEX","BAJILIVE"];
    const SPEC_ROWS = [
        { feature:"Casino Games",          values:["12,000+","12,000+","12,000+","12,000+","12,000+"] },
        { feature:"Game Control Panel",    values:["✓","✓","✓","✓","✓"] },
        { feature:"Intl. Payment Gateway", values:["✓","✓","✓","✓","✓"] },
        { feature:"Sports Betting",        values:["✓","✓","✓","✓","✓"] },
        { feature:"Live Casino",           values:["✓","✓","✓","✓","✓"] },
        { feature:"Crash Games",           values:["✓","✓","✓","✓","✓"] },
        { feature:"Mobile App",            values:["✓","✓","✓","✓","✓"] },
        { feature:"Crypto Payments",       values:["✓","✓","✓","✓","✓"] },
        { feature:"24/7 Support",          values:["✓","✓","✓","✓","✓"] },
        { feature:"VIP Program",           values:["✓","✓","✓","✓","✓"] },
    ];

    return (
        <div>
            <section id="specs" className="section">
                <div className="container">
                    <SectionHeader
                        tag="COMPARISON"
                        title={<>Platform <span className="text-primary">Specifications</span></>}
                        subtitle="Compare features across our top platforms to find the perfect fit."
                    />
                    <div className="specs-wrapper">
                        <div className="specs-table" role="table">
                            <div className="specs-table__head" role="row"
                                 style={{display:"grid",gridTemplateColumns:`170px repeat(${SPEC_COLS.length},1fr)`}}>
                                <div className="specs-table__cell--label" role="columnheader">FEATURE</div>
                                {SPEC_COLS.map((c,i)=><div key={i} className="specs-table__cell--col" role="columnheader">{c}</div>)}
                            </div>
                            {SPEC_ROWS.map((row,i)=>(
                                <div key={i} className={`specs-table__row${i%2===1?" specs-table__row--alt":""}`} role="row"
                                     style={{display:"grid",gridTemplateColumns:`170px repeat(${SPEC_COLS.length},1fr)`}}>
                                    <div className="specs-table__cell--label" role="cell">{row.feature}</div>
                                    {row.values.map((v,j)=>(
                                        <div key={j} role="cell"
                                             className={v==="✓"?"specs-table__cell--check":"specs-table__cell--value"}>
                                            {v}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Specs;