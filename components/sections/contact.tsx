"use client"

import { useState } from "react"
import FadeIn from "@/components/kokonutui/fade-in"
import GlowButton from "@/components/kokonutui/glow-button"
import { MessageCircle, Phone, Mail, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - integrate with your preferred service
    console.log("[v0] Form submitted:", formData)
    alert("¡Gracias! Te contactaré lo antes posible.")
  }

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-silver-mist text-center mb-4">
            Contáctame
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-abyss-blue to-transparent mx-auto mb-6" />
          <p className="text-center text-silver-mist/60 max-w-2xl mx-auto mb-12">
            Si sientes que tu negocio se está quedando atrás y crees que la
            tecnología puede ser parte de la solución, hablemos.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          <FadeIn delay={0.2} direction="left">
            <div className="space-y-8">
              <div>
                <p className="text-silver-mist/80 mb-6">
                  No te voy a vender nada en la primera conversación. Mi
                  meta es entender tu situación real y ver honestamente si
                  te puedo ayudar.
                </p>
                <p className="text-silver-mist font-medium">
                  Estoy aquí especialmente para dueños de PYMES que
                  quieren dar el siguiente paso tecnológico sin complicarse la
                  vida ni volverse locos.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-silver-mist/10 hover:border-abyss-blue/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/20 to-green-600/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-silver-mist font-medium">WhatsApp</p>
                    <p className="text-sm text-silver-mist/60">
                      Si no te respondo de una, habla con mi asistente de IA, el me avisa.
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-silver-mist/10 hover:border-abyss-blue/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-abyss-blue/20 to-abyss-blue/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-abyss-blue" />
                  </div>
                  <div>
                    <p className="text-silver-mist font-medium">Llamada directa</p>
                    <p className="text-sm text-silver-mist/60">
                      Casi nunca las respondo pero siempre devuelvo la llamada.
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:contacto@ejemplo.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-silver-mist/10 hover:border-abyss-blue/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-abyss-blue/20 to-abyss-blue/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-abyss-blue" />
                  </div>
                  <div>
                    <p className="text-silver-mist font-medium">Enviame un correo</p>
                    <p className="text-sm text-silver-mist/60">
                      Siempre lo reviso.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} direction="right">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-gradient-to-br from-card via-card to-void-eclipse border border-silver-mist/10"
            >
              <h3 className="text-xl font-semibold text-silver-mist mb-6">
                O déjame tus datos
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-silver-mist/70 mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-void-eclipse border border-silver-mist/20 text-silver-mist placeholder-silver-mist/40 focus:outline-none focus:border-abyss-blue transition-colors"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm text-silver-mist/70 mb-2"
                  >
                    Nombre de tu negocio
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-void-eclipse border border-silver-mist/20 text-silver-mist placeholder-silver-mist/40 focus:outline-none focus:border-abyss-blue transition-colors"
                    placeholder="Razon social, el username en redes... yo te busco."
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm text-silver-mist/70 mb-2"
                  >
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-void-eclipse border border-silver-mist/20 text-silver-mist placeholder-silver-mist/40 focus:outline-none focus:border-abyss-blue transition-colors"
                    placeholder="+57 o el pais que sea, revisa que este bien."
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-silver-mist/70 mb-2"
                  >
                    Mensaje breve
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-void-eclipse border border-silver-mist/20 text-silver-mist placeholder-silver-mist/40 focus:outline-none focus:border-abyss-blue transition-colors resize-none"
                    placeholder="Cuéntame por encima que sucede"
                  />
                </div>

                <GlowButton variant="primary" className="w-full mt-2">
                  <Send className="w-5 h-5 mr-2" />
                  Enviar mensaje
                </GlowButton>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
