import './style.css'

const app=document.querySelector('#app')
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))
const qs=new URLSearchParams(location.search)
const pin=qs.get('pin')||''

app.innerHTML=`<main class="app"><div class="wrap"><div class="brand"><span class="mark"></span><span>PULIH QUIZ · LIVE CHALLENGE</span></div><div class="big-center"><span class="status">MASUK SEBAGAI PESERTA</span><h1 style="font-size:clamp(40px,8vw,72px);margin:18px 0 8px">Masuk ke Game</h1><p class="muted">Masukkan PIN 6 digit yang tampil di layar host.</p><div class="stack" style="max-width:430px;margin:28px auto"><input class="input" id="player-pin" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="one-time-code" placeholder="PIN 6 digit" value="${esc(pin)}" style="text-align:center;font-size:28px;font-weight:800;letter-spacing:.16em"/><button class="btn" id="enter">Masuk Game →</button><p class="notice" id="msg" style="display:none"></p></div></div><div class="footer">PULIH QUIZ · Peserta</div></div></main>`

const input=document.querySelector('#player-pin')
const go=()=>{const p=input.value.replace(/\D/g,'').slice(0,6);if(p.length!==6){const m=document.querySelector('#msg');m.textContent='PIN harus terdiri dari 6 digit.';m.style.display='block';input.focus();return}location.href=`/?role=player&pin=${encodeURIComponent(p)}`}
input.addEventListener('input',()=>{input.value=input.value.replace(/\D/g,'').slice(0,6)})
input.addEventListener('keydown',e=>{if(e.key==='Enter')go()})
document.querySelector('#enter').onclick=go
