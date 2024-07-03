import{f as S,r as p,g as U,h as T,I,o as y,c as g,a as r,q as K,j as t,t as c,Q as j,m as x,v as w,n as d,R as h,l as z,d as A,y as B}from"./9qHdg9Zr.js";const D={class:"flex justify-center items-center h-[78vh]"},E={class:"flex flex-col gap-4 relative"},N=["placeholder"],Y=["placeholder"],$=["placeholder"],M={type:"submit",class:"btn"},P={key:0},R={key:1},W=S({__name:"login",setup(_){let n=p(""),l=p(""),i=p(""),s=p(!1),v=p(!1);const{signIn:V,signUp:k}=U(),{notify:m}=B(),{t:o}=T({useScope:"local"});I(s,u=>{setTimeout(u?()=>{v.value=!0}:()=>{v.value=!1},200)});async function f(){const u={email:l.value,password:i.value};try{await V(u,{callbackUrl:"/"}),m({title:o("success"),text:o("logged"),type:"success"})}catch(e){m({title:o("error"),text:e,type:"error"})}}async function b(){const u={email:l.value,password:i.value,pseudo:n.value};try{await k(u,{callbackUrl:"/"}),m({title:o("success"),text:o("created"),type:"success"}),s.value=!1}catch(e){m({title:o("error"),text:e,type:"error"})}}return(u,e)=>(y(),g("div",D,[r("div",E,[r("h1",{class:K(["text-center font-bold text-2xl transition-all duration-300 absolute",{"-top-[45px]":t(s),"-top-[40px]":!t(s)}])},c(t(s)?t(o)("register"):t(o)("login")),3),r("form",{class:"flex flex-col gap-4 relative",action:"POST",onSubmit:e[6]||(e[6]=j(a=>t(s)?b():f(),["prevent"]))},[t(v)?x((y(),g("input",{key:0,class:"input transition-all slide-right",placeholder:t(o)("pseudo"),"onUpdate:modelValue":e[0]||(e[0]=a=>d(n)?n.value=a:n=a),onKeyup:e[1]||(e[1]=h(a=>t(s)?b():f(),["enter"])),type:"text",name:"pseudo",id:"pseudo"},null,40,N)),[[w,t(n)]]):z("",!0),x(r("input",{class:"input",placeholder:t(o)("email"),"onUpdate:modelValue":e[2]||(e[2]=a=>d(l)?l.value=a:l=a),onKeyup:e[3]||(e[3]=h(a=>t(s)?b():f(),["enter"])),type:"text",name:"email",id:"email"},null,40,Y),[[w,t(l)]]),x(r("input",{class:"input",placeholder:t(o)("password"),"onUpdate:modelValue":e[4]||(e[4]=a=>d(i)?i.value=a:i=a),onKeyup:e[5]||(e[5]=h(a=>t(s)?b():f(),["enter"])),type:"password",name:"password",id:"password"},null,40,$),[[w,t(i)]]),r("button",M,c(t(s)?t(o)("register"):t(o)("login")),1)],32),t(s)?(y(),g("p",R,[A(c(t(o)("noAccount"))+" ",1),r("span",{class:"text-primary cursor-pointer",onClick:e[8]||(e[8]=a=>d(s)?s.value=!1:s=!1)},c(t(o)("login"))+".",1)])):(y(),g("p",P,[A(c(t(o)("alreadyAccount"))+" ",1),r("span",{class:"text-primary cursor-pointer",onClick:e[7]||(e[7]=a=>d(s)?s.value=!0:s=!0)},c(t(o)("createAccount"))+".",1)]))])]))}});function C(_){const n=_;n.__i18n=n.__i18n||[],n.__i18n.push({locale:"",resource:{en:{login:{t:0,b:{t:2,i:[{t:3}],s:"Sign in"}},register:{t:0,b:{t:2,i:[{t:3}],s:"Sign up"}},createAccount:{t:0,b:{t:2,i:[{t:3}],s:"Create an account"}},alreadyAccount:{t:0,b:{t:2,i:[{t:3}],s:"Already have an account ?"}},noAccount:{t:0,b:{t:2,i:[{t:3}],s:"Don't have an account ?"}},email:{t:0,b:{t:2,i:[{t:3}],s:"Your email"}},password:{t:0,b:{t:2,i:[{t:3}],s:"Your password"}},pseudo:{t:0,b:{t:2,i:[{t:3}],s:"Your pseudo"}},success:{t:0,b:{t:2,i:[{t:3}],s:"Success !"}},error:{t:0,b:{t:2,i:[{t:3}],s:"Error !"}},logged:{t:0,b:{t:2,i:[{t:3}],s:"Logged in successfully"}},created:{t:0,b:{t:2,i:[{t:3}],s:"Account created successfully"}}},fr:{login:{t:0,b:{t:2,i:[{t:3}],s:"Se connecter"}},register:{t:0,b:{t:2,i:[{t:3}],s:"S'enregistrer"}},createAccount:{t:0,b:{t:2,i:[{t:3}],s:"Créer un compte"}},alreadyAccount:{t:0,b:{t:2,i:[{t:3}],s:"Vous avez déjà un compte ?"}},noAccount:{t:0,b:{t:2,i:[{t:3}],s:"Vous n'avez pas de compte ?"}},email:{t:0,b:{t:2,i:[{t:3}],s:"Votre email"}},password:{t:0,b:{t:2,i:[{t:3}],s:"Votre mot de passe"}},pseudo:{t:0,b:{t:2,i:[{t:3}],s:"Votre pseudo"}},success:{t:0,b:{t:2,i:[{t:3}],s:"Succès !"}},error:{t:0,b:{t:2,i:[{t:3}],s:"Erreur !"}},logged:{t:0,b:{t:2,i:[{t:3}],s:"Connecté avec succès"}},created:{t:0,b:{t:2,i:[{t:3}],s:"Compte créé avec succès"}}}}})}typeof C=="function"&&C(W);export{W as default};
