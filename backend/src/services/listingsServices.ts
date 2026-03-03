import {prisma} from '../db/client.js';

interface CreateListingInput {
    vendor: string;
    manufacturer: string;
    model: string;
    exactModel: string;
    description: string;
    vram: number;
    vramType: string;
    memoryBus?: number;
    tdp?: number;
    powerConnectors?: string;
    slot?: string;
    price: number;
    condition: "LIKE_NEW" | "GOOD" | "NO_MAINTENANCE";
    images: string[];
}

interface UpdateListingInput {
    description?: string;
    vram?: number;
    vramType?: string;
    memoryBus?: number;
    tdp?: number;
    powerConnectors?: string;
    slot?: string;
    price?: number;
    condition?: "LIKE_NEW" | "GOOD" | "NO_MAINTENANCE";
    images?: string[];
}


interface GetListingsInput {
    page?: number;
    pageSize?: number;
    search?: string;
    vendor?: string;
    manufacturer?: string;
    condition?: "LIKE_NEW" | "GOOD" | "NO_MAINTENANCE";
}

export const createListing =async (data: CreateListingInput,sellerId: string)=>{
    try {
        const listing = await prisma.listing.create({
            data: {
                ...data,
                sellerId: sellerId
            }
        });
        if (!listing) {
            throw new Error('Error creating listing');
        }
        return listing;
    }
    catch (error: any) {
        throw new Error('Error creating listing: ' + error.message);
    }
}
export const updateListing = async (id: string, data: UpdateListingInput, sellerId: string) => {
    try {
        const listing = await prisma.listing.findUnique({ where: { id } });
        if (!listing) {
            throw new Error('Listing not found');
        }
        if (listing.sellerId !== sellerId) {
            throw new Error('Unauthorized to update listing');
        }
        const updatedListing = await prisma.listing.update({
            where: { id },
            data: { ...data }
        });
        return updatedListing;
    } catch (error: any) {
        throw new Error('Error updating listing: ' + error.message);
    }
}
export const deleteListing = async (id: string, sellerId: string) => {
    try {
        const listing = await prisma.listing.findUnique({ where: { id } }); 
        if (!listing) {
            throw new Error('Listing not found');
        }
        if (listing.sellerId !== sellerId) {
            throw new Error('Unauthorized to delete listing');
        }
        await prisma.listing.delete({ where: { id } });
        return { message: 'Listing deleted successfully' };
    } catch (error: any) {
        throw new Error('Error deleting listing: ' + error.message);
    }
}
export const getListing = async (id: string) => {
    try {
        const listing = await prisma.listing.findUnique({ where: { id } });
        if (!listing) {
            throw new Error('Listing not found');
        }
        return listing;
    } catch (error: any) {
        throw new Error('Error getting listing: ' + error.message);
    }
}
export const getListings = async (filters: GetListingsInput) => {
    try {
        const { page = 1, pageSize = 10, search, vendor, manufacturer, condition } = filters;
        const where: any = {};
        if (search) {
            where.OR = [
                { model: { contains: search, mode: 'insensitive' } },
                { exactModel: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (vendor) {
            where.vendor = vendor;
        }
        if (manufacturer) {
            where.manufacturer = manufacturer;
        }
        if (condition) {
            where.condition = condition;
        }
        const listings = await prisma.listing.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        });
        const total = await prisma.listing.count({ where });
        return { listings, total };
    } catch (error: any) {
        throw new Error('Error getting listings: ' + error.message);
    }
}