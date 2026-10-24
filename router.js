const qs=new URLSearchParams(location.search)
const role=qs.get('role')
const pin=qs.get('pin')

if(role==='player'&&!pin){
  import('./player-entry.js')
}else{
  import('./src.js')
}
