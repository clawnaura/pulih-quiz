import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL='https://kcakuhacryredhmubpcw.supabase.co'
const SUPABASE_KEY='sb_publishable_AfNu9RhnxYrLN6a8pYgAGA_3NpNXAFw'
const db=createClient(SUPABASE_URL,SUPABASE_KEY)
const role=new URLSearchParams(location.search).get('role')
let rendering=false

function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n}

async function enhanceFinal(){
  if(role!=='host'||rendering)return
  const center=document.querySelector('.big-center')
  if(!center||!center.textContent.includes('Pemenang PULIH QUIZ')||center.dataset.top10==='1')return
  const roomId=localStorage.getItem('pulih_host_room')
  if(!roomId)return
  rendering=true
  try{
    const {data,error}=await db.from('quiz_players').select('*').eq('room_id',roomId).order('score',{ascending:false}).limit(10)
    if(error)throw error
    const top=data||[]
    center.dataset.top10='1'
    center.innerHTML=''
    center.append(el('span','status','FINAL · TOP 10'))
    const title=el('h1','', '🏆 Pemenang PULIH QUIZ');title.style.margin='18px 0 24px';center.append(title)

    const podium=el('div','grid')
    podium.style.gridTemplateColumns=`repeat(${Math.max(Math.min(top.length,3),1)},1fr)`
    podium.style.marginBottom='24px'
    top.slice(0,3).forEach((p,i)=>{
      const card=el('div','card')
      const medal=el('div','',['🥇','🥈','🥉'][i]);medal.style.fontSize='52px';card.append(medal)
      card.append(el('h2','',p.nickname))
      const score=el('div','pin',`${Number(p.score||0).toLocaleString('id-ID')} pt`);score.style.fontSize='28px';card.append(score)
      podium.append(card)
    })
    center.append(podium)

    const heading=el('h2','','🏅 Top 10 Peserta');heading.style.margin='12px 0 14px';center.append(heading)
    const list=el('div','leader')
    top.forEach((p,i)=>{
      const row=el('div','rank')
      row.append(el('b','',`#${i+1}`))
      row.append(el('strong','',p.nickname))
      row.append(el('b','',`${Number(p.score||0).toLocaleString('id-ID')} pt`))
      list.append(row)
    })
    if(!top.length)list.append(el('p','muted','Belum ada peserta.'))
    center.append(list)

    const actions=el('div','');actions.style.marginTop='28px'
    const btn=el('button','btn ghost','Buat Game Baru')
    btn.onclick=()=>{localStorage.removeItem('pulih_host_room');location.reload()}
    actions.append(btn);center.append(actions)
  }catch(e){console.error('Final Top 10:',e)}finally{rendering=false}
}

const observer=new MutationObserver(()=>enhanceFinal())
observer.observe(document.documentElement,{childList:true,subtree:true})
enhanceFinal()
