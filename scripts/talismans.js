export default [
    {
        name: "strength", // Название талисмана
        typeId: "minecraft:totem_of_undying", // Айди предмета
        lore: ["§r§5+4 урона", "§r§5+4 здоровья"], // Описание
        nameTag: "§r§l§cТалисман Силы", // Отображаемое название
        effects: [ // Эффекты
            {
                type: "strength", // Название
                amplifier: 2 // Уровень
            },
            {
                type: "health_boost",
                amplifier: 1
            }
        ]
    },
    {
        name: "speed",
        typeId: "minecraft:totem_of_undying",
        lore: ["§r§5+20 скорости", "§r§5+4 здоровья"],
        nameTag: "§r§l§bТалисман Скорости",
        effects: [
            {
                type: "speed",
                amplifier: 1
            },
            {
                type: "health_boost",
                amplifier: 1
            }
        ]
    }
];
