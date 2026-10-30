import { API_BASE_URL } from './config';

interface UploadResponse {
    blobUrl: string;
    fileName: string;
}

export const fileClient = {
    async uploadScan(file: File, token: string): Promise<UploadResponse> {
        const ext = file.name.includes('.') ? '.' + file.name.split('.').pop()!.toLowerCase() : '';

        const sasResponse = await fetch(`${API_BASE_URL}/storage/upload-url?extension=${encodeURIComponent(ext)}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!sasResponse.ok) {
            throw new Error(`Failed to get upload URL: ${sasResponse.status}`);
        }

        const { uploadUrl, blobUrl } = await sasResponse.json() as { uploadUrl: string; blobUrl: string };

        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': file.type || 'application/octet-stream',
            },
            body: file,
        });

        if (!uploadResponse.ok) {
            throw new Error(`Failed to upload file: ${uploadResponse.status}`);
        }

        return { blobUrl, fileName: file.name };
    },
};