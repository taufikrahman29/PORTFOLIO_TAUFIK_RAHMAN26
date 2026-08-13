import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = body.path || '/';
    revalidatePath(path);
    revalidatePath('/projects/[slug]', 'page');
    return NextResponse.json({ revalidated: true, path, timestamp: Date.now() }, { status: 200 });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Gagal melakukan revalidasi cache' }, { status: 500 });
  }
}
