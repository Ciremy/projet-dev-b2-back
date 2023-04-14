import prisma from '../../prisma/prismaInstance';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const monsters = await prisma.monster.findMany({
      include: {
        spells: true,
      },
    });

    res.status(200).json(monsters);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const monster = await prisma.monster.findUnique({
    where: {
      id: String(id),
    },
  });
  res.json(monster);
});

router.post('/', async (req, res) => {
  const { name, spells }: { name: string; spells?: string[] } = req.body;

  // check if there are duplicate spells
  const uniqueSpells = new Set(spells);
  if (uniqueSpells.size !== spells?.length) {
    res.status(400).send('There are duplicate spells');
  }

  try {
    const spellsConnections =
      spells?.map((spellId: string) => {
        return { id: spellId };
      }) ?? [];

    const newMonster = await prisma.monster.create({
      data: {
        name,
        spells: {
          connect: spellsConnections,
        },
      },
      include: {
        spells: true,
      },
    });
    res.json(newMonster);
  } catch (error) {
    res.status(500);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, spells }: { name: string; spells?: string[] } = req.body;

  const spellsConnections = spells?.map((spellId: string) => {
    return { id: spellId };
  });

  const room = await prisma.monster.update({
    where: {
      id: String(id),
    },
    data: {
      name,
      spells: {
        connect: spellsConnections,
      },
    },
    include: {
      spells: true,
    },
  });

  res.json(room);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const monster = await prisma.monster.delete({
    where: {
      id: String(id),
    },
    include: {
      spells: true,
    },
  });
  res.json(monster);
});

export default router;
