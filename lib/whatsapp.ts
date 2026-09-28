import { Product, Service, CartItem } from '@/types';
import { formatINR } from './utils';

const DEFAULT_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '919946718868';

export function getWhatsAppProductEnquiryUrl(
  product: Product,
  quantity: number = 1,
  selectedPot?: string,
  customNote?: string
): string {
  const lines = [
    `*INDOOR PETALS - Product Enquiry* 🪴`,
    `----------------------------------------`,
    `*Product:* ${product.name}`,
    `*Code:* ${product.productCode}`,
    `*Price:* ${formatINR(product.price)} (MRP: ${formatINR(product.mrp)})`,
    `*Quantity:* ${quantity}`,
    `*Pot/Planter:* ${selectedPot || product.potType}`,
    `*Availability:* ${product.availability}`,
    `----------------------------------------`,
    customNote ? `*Enquiry:* ${customNote}` : `Hello INDOOR PETALS, I would like to know more about this plant & check delivery availability to my location.`,
  ];

  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${DEFAULT_PHONE}?text=${message}`;
}

export function getWhatsAppServiceEnquiryUrl(
  service: Service,
  customNote?: string
): string {
  const lines = [
    `*INDOOR PETALS - Service Consultation* 🌿`,
    `----------------------------------------`,
    `*Service:* ${service.title}`,
    `----------------------------------------`,
    customNote ? `*Requirement:* ${customNote}` : service.whatsappMessage,
  ];

  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${DEFAULT_PHONE}?text=${message}`;
}

export function getWhatsAppCartOrderUrl(
  items: CartItem[],
  total: number,
  customerName?: string,
  pincode?: string
): string {
  const itemsList = items.map((item, idx) => 
    `${idx + 1}. ${item.product.name} [${item.product.productCode}] x ${item.quantity} = ${formatINR(item.product.price * item.quantity)}`
  ).join('\n');

  const lines = [
    `*INDOOR PETALS - WhatsApp Quick Order* 🛍️`,
    `----------------------------------------`,
    customerName ? `*Customer:* ${customerName}` : `*Customer Order Request*`,
    pincode ? `*Delivery Pincode:* ${pincode}` : '',
    `----------------------------------------`,
    `*Items:*`,
    itemsList,
    `----------------------------------------`,
    `*Total Estimated Amount:* ${formatINR(total)}`,
    `----------------------------------------`,
    `Please confirm stock availability and share payment/delivery steps.`,
  ].filter(Boolean);

  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${DEFAULT_PHONE}?text=${message}`;
}

export function getWhatsAppGeneralHelpUrl(): string {
  const message = encodeURIComponent(
    `Hello INDOOR PETALS Team! I have a question regarding indoor plants, planters, and gardening services.`
  );
  return `https://wa.me/${DEFAULT_PHONE}?text=${message}`;
}
