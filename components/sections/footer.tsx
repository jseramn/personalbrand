import { Phone, Mail, MessageCircle } from "lucide-react"
import { Linkedin, Instagram } from "@/components/ui/icons"
import ThemeToggle from "@/components/theme-toggle"

const navLinks = [
  { label: "Quién soy", href: "#quien-soy" },
  { label: "Qué hago", href: "#problemas" },
  { label: "Cómo lo hago", href: "#proceso" },
  { label: "Problemas que resuelvo", href: "#valor" },
  { label: "Casos reales", href: "#casos" },
  { label: "Contacto", href: "#contacto" },
]

const contactItems = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/573241083976",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:tuemail@dominio.com",
  },
  {
    icon: Phone,
    label: "+57 301 429 8055",
    href: "tel:+573014298055",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jseramn/",
  },
  {
    icon: Instagram,
    label: "@jseramn",
    href: "https://instagram.com/jseramn",
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <a href="#" className="text-2xl font-bold text-foreground hover:text-primary transition-colors w-fit">
              JR<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Resuelvo tus problemas con tecnología.
              <br />
              Te explico cómo y lo hacemos realidad juntos.
            </p>
            <p className="text-xs text-muted-foreground/50 leading-relaxed mt-1">
              Construido para dueños de medianas empresas que quieren crecer sin volverse locos con la tecnología.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground/50 mb-1">Navegación</p>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground/50 mb-1">Contacto</p>
            <div className="grid gap-3">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border/20 bg-card/80 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest text-muted-foreground/50 mb-1">Legal</p>
              <span className="text-sm text-muted-foreground/40 select-none">Política de privacidad</span>
              <span className="text-sm text-muted-foreground/40 select-none">Términos de servicio</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/50">© {currentYear} José Ramón. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground/50">Tema</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
