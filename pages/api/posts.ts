
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


// POST handler to create a new post
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content, imageUrl } = req.body;

    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          imageUrl,
        },
      });

      res.status(200).json({ success: true, post: newPost });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Error creating post' });
    }
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
