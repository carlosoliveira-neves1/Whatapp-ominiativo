export type Product = {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image: string
  category: string
  active: boolean
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Camiseta Básica',
    description: 'Camiseta 100% algodão, disponível em várias cores',
    price: 79.9,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
    category: 'Roupas',
    active: true,
  },
  {
    id: '2',
    name: 'Calça Jeans',
    description: 'Calça jeans slim fit, confortável e durável',
    price: 149.9,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop',
    category: 'Roupas',
    active: true,
  },
  {
    id: '3',
    name: 'Tênis Esportivo',
    description: 'Tênis leve para corrida e academia',
    price: 299.9,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
    category: 'Calçados',
    active: true,
  },
  {
    id: '4',
    name: 'Vestido Floral',
    description: 'Vestido leve para o verão',
    price: 189.9,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&h=200&fit=crop',
    category: 'Roupas',
    active: false,
  },
  {
    id: '5',
    name: 'Jaqueta de Couro',
    description: 'Jaqueta estilo motociclista',
    price: 450.0,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop',
    category: 'Roupas',
    active: true,
  },
  {
    id: '6',
    name: 'Bolsa Feminina',
    description: 'Bolsa de couro sintético',
    price: 129.9,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop',
    category: 'Acessórios',
    active: true,
  },
]
