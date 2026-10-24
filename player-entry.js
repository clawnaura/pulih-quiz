const app=document.querySelector('#app')
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))
const qs=new URLSearchParams(location.search)
const pin=qs.get('pin')||''

const style=document.createElement('style')
style.textContent=`*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:radial-gradient(circle at 20% 10%,#123b64 0,#071b33 42%,#04101f 100%);color:#fff}.app{min-height:100vh;padding:24px}.wrap{width:min(1100px,100%);margin:0 auto;min-height:calc(100vh - 48px);display:flex;flex-direction:column}.brand{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:800;letter-spacing:.12em}.mark{width:15px;height:15px;border-radius:4px;background:#f59e0b;box-shadow:0 0 22px rgba(245,158,11,.45)}.big-center{flex:1;display:flex;flex-direction:column;justify-content:center;text-align:center}.status{display:inline-flex;align-self:center;padding:8px 13px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(255,255,255,.08);font-size:12px;font-weight:800;letter-spacing:.08em}.muted{color:#c9d7e7;font-size:16px;line-height:1.6}.stack{display:grid;gap:12px}.input{width:100%;border:1px solid rgba(255,255,255,.2);border-radius:16px;padding:17px 18px;background:#fff;color:#071b33;outline:none;box-shadow:0 12px 35px rgba(0,0,0,.18)}.input:focus{box-shadow:0 0 0 4px rgba(245,158,11,.25)}.btn{border:0;border-radius:16px;padding:17px 20px;background:#f59e0b;color:#071b33;font-size:16px;font-weight:900;cursor:pointer;box-shadow:0 12px 30px rgba(245,158,11,.22)}.btn:active{transform:translateY(1px)}.notice{padding:12px;border-radius:12px;background:rgba(239,68,68,.15);color:#fecaca}.footer{text-align:center;color:#8297ad;font-size:12px;padding:18px 0}h1{line-height:1.05}@media(max-width:600px){.app{padding:18px}.wrap{min-height:calc(100vh - 36px)}}`
document.head.appendChild(style)

app.innerHTML=`<main class="app"><div class="wrap"><div class="brand"><span class="mark"></span><span>PULIH QUIZ · LIVE CHALLENGE</span></div><div class="big-center"><span class="status">MASUK SEBAGAI PESERTA</span><h1 style="font-size:clamp(40px,8vw,72px);margin:18px 0 8px">Masuk ke Game</h1><p class="muted">Masukkan PIN 6 digit yang tampil di layar host.</p><div class="stack" style="max-width:430px;margin:28px auto;width:100%"><input class="input" id="player-pin" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="one-time-code" placeholder="PIN 6 digit" value="${esc(pin)}" style="text-align:center;font-size:28px;font-weight:800;letter-spacing:.16em"/><button class="btn" id="enter">Masuk Game →</button><p class="notice" id="msg" style="display:none"></p></div></div><div class="footer">PULIH QUIZ · Peserta</div></div></main>`

const input=document.querySelector('#player-pin')
const go=()=>{const p=input.value.replace(/\D/g,'').slice(0,6);if(p.length!==6){const m=document.querySelector('#msg');m.textContent='PIN harus terdiri dari 6 digit.';m.style.display='block';input.focus();return}location.href=`/?role=player&pin=${encodeURIComponent(p)}`}
input.addEventListener('input',()=>{input.value=input.value.replace(/\D/g,'').slice(0,6)})
input.addEventListener('keydown',e=>{if(e.key==='Enter')go()})
document.querySelector('#enter').onclick=go
input.focus()
