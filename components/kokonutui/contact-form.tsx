"use client"

import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Contact form submitted", formData)
    window.alert("¡Gracias! Te contactaré lo antes posible.")
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-gradient-to-br from-card via-card to-void-eclipse border border-silver-mist/10">
      <h3 className="text-xl font-semibold text-silver-mist mb-6">O déjame tus datos</h3>

      <div className="space-y-4">
        {[
          { id: "name", label: "Nombre", type: "text", required: true },
          { id: "company", label: "Nombre de tu negocio", type: "text", required: false },
          { id: "phone", label: "Teléfono / WhatsApp", type: "tel", required: true },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm text-silver-mist/70 mb-2">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              required={field.required}
              value={formData[field.id as keyof typeof formData]}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.id]: event.target.value,
                }))
              }
              className="w-full px-4 py-3 rounded-xl bg-void-eclipse border border-silver-mist/20 text-silver-mist placeholder-silver-mist/40 focus:outline-none focus:border-abyss-blue transition-colors"
            />
          </div>
        ))}

        <div>
          <label htmlFor="message" className="block text-sm text-silver-mist/70 mb-2">
            Mensaje breve
          </label>
          <textarea
            id="message"
            required={false}
            rows={3}
            value={formData.message}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                message: event.target.value,
              }))
            }
            className="w-full px-4 py-3 rounded-xl bg-void-eclipse border border-silver-mist/20 text-silver-mist placeholder-silver-mist/40 focus:outline-none focus:border-abyss-blue transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_rgba(43,57,109,0.25)]"
        >
          Enviar mensaje
        </button>
      </div>
    </form>
  )
}
