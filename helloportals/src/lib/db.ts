// Simplified database interface without Prisma dependency
export const prisma = {
  userProfile: {
    findUnique: async ({ where, include }: any) => {
      // Mock implementation
      return null;
    }
  }
};