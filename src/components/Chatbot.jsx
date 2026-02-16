import { useEffect } from "react";

export default function Chatbot(){
      useEffect(() => {
        // QuickChat initialization
        (function(e,a,d,i,c,t=a.createElement(d)){
          e[c]=e[c]||function(){(e[c].q=e[c].q||[]).push(arguments)},
          t.src=i,
          t.async=1,
          a.body.insertAdjacentElement("beforeend",t)
        })(window,document,"script","https://widget.quickchat.ai/chat.js","_quickchat");
        
        window._quickchat("host", "app.quickchat.ai");
        window._quickchat("init", "u3llbls924");
      }, []);
}