var Xle=require("path");U();Nt();var $g=B(require("vscode"));U();Nt();Ba();
pendingNotifications=[];internalNotificationHandlers=new Set;ephemeralThreadTimeouts=new Map;pendingPrewarmedThreadStartRequestIds=new Set;prewarmedThreads=new Eh;
sendProviderRequest(e,r,n,o,i){let s=`${e}:${r}`;i&&this.pendingPrewarmedThreadStartRequestIds.add(s);let a={id:s,method:n,params:o};if(this.recordLastOutboundMethod(n),this.sendMessage(a)&&n==="turn/start"){let c=t_(o);c!=null&&this.prewarmedThreads.publishThreadStarted(c)}}
let s=this.providers.get(n);if(s?.onResult){let a={...e,id:i};s.onResult(a)}return{routeKind:"response",method:null}}
