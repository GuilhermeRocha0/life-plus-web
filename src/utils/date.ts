export function formatDateBR(dateString: string) {
  if (!dateString) return ''

  const date = new Date(dateString)

  const dia = String(date.getDate()).padStart(2, '0')
  const mes = String(date.getMonth() + 1).padStart(2, '0')
  const ano = date.getFullYear()

  const hora = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const seg = String(date.getSeconds()).padStart(2, '0')

  return `${dia}/${mes}/${ano}, ${hora}:${min}:${seg}`
}
