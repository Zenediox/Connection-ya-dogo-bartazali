import nodemailer from 'nodemailer'

export default async function handler(req,res){
  if(req.method !== 'POST') 
    return res.status(405).json({error:'Method not allowed'})

  const { email } = req.body || {}

  if(!email) 
    return res.status(400).json({error:'Email is required'})

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(!emailRegex.test(email))
    return res.status(400).json({error:'Invalid email'})

  try{
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    })

    const ownerMail = {
      from: `BYDERN <${process.env.SMTP_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New signup: ${email}`,
      html: `<p>New user signed up with email: <strong>${email}</strong></p>`
    }

    await transporter.sendMail(ownerMail)

    return res.status(200).json({message:'Signup successful — owner notified.'})

  }catch(err){
    console.error(err)
    return res.status(500).json({error:'Failed to send notification.'})
  }
      }
