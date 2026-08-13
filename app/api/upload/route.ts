import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'profile';

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      // 1. Try local filesystem upload (works on localhost)
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
      await mkdir(uploadDir, { recursive: true });

      const fileExt = file.name.split('.').pop() || 'png';
      const fileName = `${folder}-${Date.now()}.${fileExt}`;
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      const publicUrl = `/uploads/${folder}/${fileName}`;

      return NextResponse.json({ url: publicUrl, fileName }, { status: 200 });
    } catch (fsErr) {
      // 2. Serverless fallback for Vercel read-only filesystem
      console.warn('Local filesystem read-only (Vercel serverless environment), returning Base64 Data URL fallback');
      const base64Data = buffer.toString('base64');
      const mimeType = file.type || 'image/jpeg';
      const dataUrl = `data:${mimeType};base64,${base64Data}`;

      return NextResponse.json({ url: dataUrl, fileName: file.name }, { status: 200 });
    }
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Gagal mengunggah file' }, { status: 500 });
  }
}
