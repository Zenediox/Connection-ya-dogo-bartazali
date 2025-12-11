import { useState } from 'react'

export default function Home(){
  const [email,setEmail] = useState('')
  const [msg,setMsg] = useState(null)
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    setMsg(null)
    try{
      const res = await fetch('/api/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email})
      })
      const data = await res.json()
      if(res.ok){
        setMsg({type:'success',text:data.message})
        setEmail('')
      } else {
        setMsg({type:'error',text:data.error || 'Something went wrong'})
      }
    }catch(err){
      setMsg({type:'error',text:err.message})
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 text-white p-6">
      <div className="max-w-3xl w-full bg-white/5 rounded-2xl p-8 shadow-lg">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">BYDERN ZENEDIOX</h1>
          <p className="mt-2 text-sm opacity-80">Jiunge kwa email ili upokee taarifa mpya.</p>
        </header>

        <section className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <h2 className="text-xl font-semibold mb-2">Jiunge kwa email</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                required 
                type="email" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                placeholder="Email yako"
                className="w-full p-3 rounded bg-white/8 placeholder:text-white/60"
              />

              <button 
                disabled={loading} 
                className="w-full py-3 rounded bg-indigo-600 hover:bg-indigo-500 transition"
              >
                {loading ? 'Inatuma...' : 'Jiunge'}
              </button>
            </form>

            {msg && (
              <div className={`mt-3 p-3 rounded ${msg.type==='success'? 'bg-green-800' : 'bg-red-900'}`}>
                {msg.text}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Video</h2>

            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/reel/DSC3wQvjP2P/"
              data-instgrm-version="14"
              style={{background:'#000',padding:'1rem',borderRadius:'12px'}}
            >
              <a 
                href="https://www.instagram.com/reel/DSC3wQvjP2P/" 
                target="_blank" 
                rel="noreferrer noopener"
              >
                Open Instagram Reel
              </a>
            </blockquote>

            <script async src="https://www.instagram.com/embed.js"></script>
          </div>
        </section>

        <footer className="mt-6 text-xs opacity-70">
          Phone: +255622268725
        </footer>
      </div>
    </main>
  )
                }
