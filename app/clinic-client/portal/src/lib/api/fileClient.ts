interface UploadResponse {
    blobUrl: string;
    fileName: string;
}

export const fileClient = {
    async uploadScan(file: File): Promise<UploadResponse> {
        // First, get a SAS URL from your backend
        // const response = await fetch('/api/upload-url', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         fileName: file.name,
        //         contentType: file.type
        //     })
        // });

        // if (!response.ok) {
        //     throw new Error('Failed to get upload URL');
        // }

        // const { uploadUrl, blobUrl } = await response.json();
        const { uploadUrl, blobUrl } = {uploadUrl: 'https://example.com/upload', blobUrl: 'https://example.com/blob'};


        // Upload the file directly to Azure Storage
        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': file.type,
            },
            body: file
        });

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload file');
        }

        return {
            blobUrl,
            fileName: file.name
        };
    }
};