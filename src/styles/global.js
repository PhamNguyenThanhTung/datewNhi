export const G = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  body{margin:0;background:#0a0a12;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pop{0%{transform:scale(0.85);opacity:0}60%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}
  @keyframes hb{0%,100%{transform:scale(1)}14%{transform:scale(1.22)}28%{transform:scale(1)}42%{transform:scale(1.1)}}
  @keyframes shimmer{0%{background-position:200%}100%{background-position:-200%}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
  @keyframes sb{0%{transform:scale(1)}40%{transform:scale(1.3) rotate(-4deg)}70%{transform:scale(.95)}100%{transform:scale(1)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  textarea:focus,input:focus{border-color:rgba(255,107,157,0.5)!important;outline:none;}
  ::-webkit-scrollbar{width:0;}
  .avt-wrap:hover .avt-overlay{opacity:1!important;}
`;

export const IS = { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:"13px 16px", color:"#fff", fontSize:15, width:"100%", fontFamily:"inherit" };
export const BS = (bg) => ({ background:bg, border:"none", borderRadius:14, padding:"14px 20px", color:"#fff", fontWeight:800, fontSize:14, cursor:"pointer", width:"100%", fontFamily:"inherit", boxShadow:"0 6px 24px rgba(255,107,157,0.18)", marginBottom:6 });
export const GB = { background:"transparent", border:"none", color:"#555", fontSize:14, cursor:"pointer", padding:"10px", fontFamily:"inherit", display:"block", margin:"4px auto 0" };
