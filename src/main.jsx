import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CreditCard, Gift, ArrowLeft, Sparkles, Clock3, Download, Smartphone, BadgeIndianRupee, CheckCircle2 } from 'lucide-react';
import './style.css';
import qrImage from './assets/peoples-pay-qr.jpg';

const recipient = import.meta.env.VITE_RECIPIENT_NAME || 'my People\'s Bank account';
const amount = import.meta.env.VITE_AMOUNT_LABEL || 'Rs. 500.00';
const notes = ['Nice try, baby! 😭', 'Not that one 🙈', 'Nope, you love me 💕', 'Catch me if you can 🏃', 'JUST SAY YES! 🥹'];

function Hearts() {
  return <div className="hearts" aria-hidden="true">{Array.from({length:17},(_,i)=><span key={i} style={{left:`${(i*37+11)%100}%`,animationDelay:`-${(i*1.17)%14}s`,animationDuration:`${11+i%7}s`,fontSize:`${12+i%4*7}px`}}>{i%3===0?'✦':'♥'}</span>)}</div>
}
function Pill({children}) { return <div className="pill"><Sparkles size={14}/>{children}</div> }

function App(){
  const [page,setPage]=useState('welcome');
  const [noPos,setNoPos]=useState({x:0,y:0});
  const [attempts,setAttempts]=useState(0);
  const [downloaded,setDownloaded]=useState(false);
  const arena=useRef(null);
  const noBtn=useRef(null);

  const moveNo=()=>{
    const box=arena.current?.getBoundingClientRect();
    const btn=noBtn.current?.getBoundingClientRect();
    if (!box) return;
    const width=btn?.width||120, height=btn?.height||48;
    const maxX=Math.max(0,box.width-width-18),maxY=Math.max(0,box.height-height-18);
    setNoPos({x:Math.round(9+Math.random()*maxX),y:Math.round(9+Math.random()*maxY)});
    setAttempts(v=>v+1);
  };

  const next=(p)=>{setPage(p);window.scrollTo({top:0,behavior:'smooth'})};

  useEffect(()=>{
    if(page==='question'){
      setNoPos({x:0,y:0});
      setAttempts(0);
    }
  },[page]);

  const downloadQr = () => {
    const a = document.createElement('a');
    a.href = qrImage;
    a.download = 'love-tax-qr.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
  };

  return <div className="app"><Hearts/><main className="shell"><div className="brand"><span className="brand-icon">♡</span> a little something, just for you <span className="brand-icon">♡</span></div>
    <AnimatePresence mode="wait">
      {page==='welcome'&&<motion.section key="welcome" className="panel" initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}} transition={{duration:.4}}>
        <Pill>TO THE MOST SPECIAL GIRL IN THE WORLD</Pill><div className="hero-icon">💌</div>
        <p className="eyebrow">HEY, BEAUTIFUL</p><h1>I made a little<br/><em>something for you.</em></h1>
        <p className="subtitle">Because making you smile is kind of my favorite thing to do. There&apos;s a tiny surprise waiting inside. ♡</p>
        <button className="primary" onClick={()=>next('question')}>Click me, baby <Heart size={18} fill="currentColor"/></button>
        <p className="tiny">made with an unreasonable amount of love ✦</p>
      </motion.section>}

      {page==='question'&&<motion.section key="question" className="panel question" initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.96}}>
        <Pill>VERY IMPORTANT QUESTION</Pill><div className="hero-icon">💗</div>
        <h1>Do you <em>love me?</em></h1><p className="subtitle">Think carefully... your answer has extremely serious consequences. 👀</p>
        <div className="arena" ref={arena}>
          <button className="primary yes" onClick={()=>next('tax')}>YES, OBVIOUSLY! 💖</button>
          <button className="no" ref={noBtn} style={attempts?{left:noPos.x,top:noPos.y}:undefined} onPointerEnter={e=>{if(e.pointerType==='mouse')moveNo()}} onPointerDown={e=>{e.preventDefault();moveNo()}} onFocus={moveNo}>No 😒</button>
        </div><p className="tease" aria-live="polite">{attempts?notes[(attempts-1)%notes.length]:'Choose wisely... 😇'}</p>
      </motion.section>}

      {page==='tax'&&<motion.section key="tax" className="panel" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}}>
        <Pill>YOU SAID YES! 🥹</Pill><div className="hero-icon">🎀</div><h1>Time to pay your<br/><em>Love Tax.</em></h1>
        <p className="subtitle">Your love has been officially confirmed. There&apos;s just one teensy-weensy voluntary administrative fee. 😂</p>
        <div className="receipt"><div className="receipt-head"><Gift size={19}/> THE LOVE TAX INVOICE <span>#001</span></div><div className="receipt-row"><span>Being the cutest girlfriend</span><strong>Priceless</strong></div><div className="receipt-row"><span>Love Tax (one-time, optional)</span><strong>{amount}</strong></div><div className="receipt-total"><span>Amount you&apos;ll pay</span><strong>{amount}</strong></div><p className="receipt-note">This is a personal People&apos;s Pay / LankaQR transfer to {recipient}. It&apos;s not a product purchase or legal tax. The website itself does not collect card or bank details.</p></div>

        <div className="qr-card">
          <div className="qr-card-head"><Smartphone size={18}/> Scan this QR to pay</div>
          <img src={qrImage} alt="People's Pay QR code for the Love Tax payment" className="qr-image" />
          <div className="qr-badges">
            <span><BadgeIndianRupee size={14}/> {amount}</span>
            <span><CheckCircle2 size={14}/> People's Pay / LankaQR</span>
          </div>
          <p className="qr-note">If she&apos;s using the same phone as the website, she can tap download and pay by opening the QR image in another device or app that supports QR scanning.</p>
          <div className="qr-actions">
            <button className="secondary" onClick={downloadQr}><Download size={17}/> Download QR</button>
            <button className="primary" onClick={()=>next('pending')}><CreditCard size={19}/> I&apos;ve paid ❤️</button>
          </div>
          {downloaded && <p className="tiny qr-tiny">QR downloaded. Time to make the cutest payment ever. 😭💗</p>}
        </div>

        <button className="quiet" onClick={()=>next('success-free')}>Skip the payment — I still love you ♡</button>
        <p className="tiny">No pressure. The love part is always free. ♡</p>
      </motion.section>}

      {page==='pending'&&<motion.section key="pending" className="panel" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}><div className="hero-icon">⏳</div><h1>Payment <em>pending...</em></h1><p className="subtitle">If you&apos;ve sent the Love Tax, the recipient can now check their People&apos;s Pay / People&apos;s Bank app to verify the transfer. This website can&apos;t automatically confirm personal QR payments.</p><div className="status-box"><CheckCircle2 size={18}/><span>Once the payment is confirmed in the bank app, you can continue to the final love message. 💖</span></div><button className="secondary" onClick={()=>next('tax')}><ArrowLeft size={16}/> Back to QR</button><button className="primary" onClick={()=>next('success')}><Heart size={16} fill="currentColor"/> Payment confirmed — continue</button><button className="quiet" onClick={()=>next('success-free')}>Continue without payment ♡</button></motion.section>}

      {(page==='success-free'||page==='success')&&<motion.section key="love-note" className="panel" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}}><Pill>A MESSAGE FOR YOU</Pill><div className="hero-icon celebrate">💖</div><h1>YOU ACTUALLY<br/><em>LOVE ME!!</em> 😭</h1><p className="subtitle">I knew it all along. You&apos;re my favorite notification, my favorite person, and my favorite everything. I love you more than words (and definitely more than {amount}). ♡</p><div className="love-card">&quot;Out of everyone in the world, I&apos;d still choose you. Every single time.&quot;<span>— Your favorite idiot 💌</span></div><p className="tiny">Love confirmed. Payment optional. Your cuteness is mandatory. ♡</p><button className="secondary" onClick={()=>{setDownloaded(false);next('welcome')}}>Play again <Heart size={16}/></button></motion.section>}
    </AnimatePresence>
    <footer>EST. THE MOMENT I FELL FOR YOU <span>♡</span> MADE ONLY FOR YOU</footer>
  </main></div>
}

createRoot(document.getElementById('root')).render(<App/>);
