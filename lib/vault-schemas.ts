import { z } from 'zod'

export const passwordDataSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  website: z.string().optional().default(''),
  notes: z.string().optional().default(''),
})

export const deviceDataSchema = z.object({
  type: z.enum(['phone', 'laptop', 'tablet', 'router', 'other']),
  brand: z.string().optional().default(''),
  serialNumber: z.string().optional().default(''),
  os: z.string().optional().default(''),
  notes: z.string().optional().default(''),
})

export const subscriptionDataSchema = z.object({
  plan: z.string().optional().default(''),
  billingCycle: z.enum(['monthly', 'annual']).default('monthly'),
  cost: z.string().min(1, 'Cost is required'),
  renewalDate: z.string().optional().default(''),
  loginEmail: z.string().optional().default(''),
  notes: z.string().optional().default(''),
})

export const noteDataSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  tag: z.string().optional().default(''),
})

export const familyDataSchema = z.object({
  relationship: z.string().min(1, 'Relationship is required'),
  birthday: z.string().optional().default(''),
  email: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  notes: z.string().optional().default(''),
})

export function getSchemaForCategory(category: string) {
  switch (category) {
    case 'PASSWORD': return passwordDataSchema
    case 'DEVICE': return deviceDataSchema
    case 'SUBSCRIPTION': return subscriptionDataSchema
    case 'NOTE': return noteDataSchema
    case 'FAMILY': return familyDataSchema
    default: return z.record(z.any())
  }
}

export type PasswordData = z.infer<typeof passwordDataSchema>
export type DeviceData = z.infer<typeof deviceDataSchema>
export type SubscriptionData = z.infer<typeof subscriptionDataSchema>
export type NoteData = z.infer<typeof noteDataSchema>
export type FamilyData = z.infer<typeof familyDataSchema>
