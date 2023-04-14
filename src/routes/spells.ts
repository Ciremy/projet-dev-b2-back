import prisma from '../../prisma/prismaInstance';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const spells = await prisma.spell.findMany();

    res.status(200).json(spells);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const spell = await prisma.spell.findUnique({
    where: {
      id: String(id),
    },
  });
  res.json(spell);
});

router.post('/', async (req, res) => {
  const { name }: { name: string; defaultPrice: number } = req.body;
  const newspell = await prisma.spell.create({
    data: {
      name,
    },
  });
  res.json(newspell);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name }: { name: string } = req.body;
  const spell = await prisma.spell.update({
    where: {
      id: String(id),
    },
    data: {
      name,
    },
  });

  res.json(spell);
});

export default router;
