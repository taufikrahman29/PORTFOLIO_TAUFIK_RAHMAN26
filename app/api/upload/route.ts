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

    // Target upload directory: public/uploads/[folder]
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    await mkdir(uploadDir, { recursive: true });

    // Generate unique physical file name
    const fileExt = file.name.split('.').pop() || 'png';
    const fileName = `${folder}-${Date.now()}.${fileExt}`;
    const filePath = path.join(uploadDir, fileName);

    // Write file directly to local filesystem
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${folder}/${fileName}`;

    return NextResponse.json({ url: publicUrl, fileName }, { status: 200 });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Gagal mengunggah file ke direktori' }, { status: 500 });
  }
}
