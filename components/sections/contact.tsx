import ContactForm from "@/components/kokonutui/contact-form"
import { MessageCircle, Phone, Mail } from "lucide-react"

export default function Contact() {
  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-silver-mist text-center mb-4">
          Contáctame
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-abyss-blue to-transparent mx-auto mb-6" />
        <p className="text-center text-silver-mist/60 max-w-2xl mx-auto mb-12">
          Si sientes que tu negocio se está quedando atrás y crees que la tecnología puede ser parte de la solución, hablemos.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <p className="text-silver-mist/80 mb-6">
                No te voy a vender nada en la primera conversación. Mi meta es entender tu situación real y ver honestamente si te puedo ayudar.
              </p>
              <p className="text-silver-mist font-medium">
                Estoy aquí especialmente para dueños de PYMES que quieren dar el siguiente paso tecnológico sin complicarse la vida ni volverse locos.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-silver-mist/10 hover:border-abyss-blue/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/20 to-green-600/5 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-silver-mist font-medium">WhatsApp</p>
                  <p className="text-sm text-silver-mist/60">Si no te respondo de una, habla con mi asistente de IA, el me avisa.</p>
                </div>
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-silver-mist/10 hover:border-abyss-blue/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-abyss-blue/20 to-abyss-blue/5 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-abyss-blue" />
                </div>
                <div>
                  <p className="text-silver-mist font-medium">Llamada directa</p>
                  <p className="text-sm text-silver-mist/60">Casi nunca las respondo pero siempre devuelvo la llamada.</p>
                </div>
              </a>

              <a
                href="mailto:contacto@ejemplo.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-silver-mist/10 hover:border-abyss-blue/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-abyss-blue/20 to-abyss-blue/5 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-abyss-blue" />
                </div>
                <div>
                  <p className="text-silver-mist font-medium">Enviame un correo</p>
                  <p className="text-sm text-silver-mist/60">Siempre lo reviso.</p>
                </div>
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
