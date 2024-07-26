console.warn("Аддон «Талисманы» успешно загружен!");
import { world, system, ItemStack } from "@minecraft/server";
import talismans from "./talismans";

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const offhand = player.getComponent("equippable").getEquipment("Offhand");
        if (!offhand) continue;
        for (const talisman of talismans) {
            if (offhand.typeId !== talisman.typeId) continue;
            let isTalisman = true;
            for (let i = 0; i < talisman.lore.length; i++) {
                if (talisman.lore[i] !== offhand.getLore()[i]) isTalisman = false;
                continue;
            }
            if (!isTalisman) continue;
            for (const effect of talisman.effects) {
                player.addEffect(effect.type, 40, { amplifier: effect.amplifier - 1, showParticles: false });
            }
        }
    }
});

system.afterEvents.scriptEventReceive.subscribe((data) => {
    const { id, sourceEntity: player } = data;
    if (!id.startsWith("talismans:")) return;
    if (id == "talismans:help") {
        player.sendMessage("§2--- Помощь по талисманам ---");
        player.sendMessage("/scriptevent talismans:help - помощь по талисманам");
        player.sendMessage("/scriptevent talismans:list - список талисманов");
        player.sendMessage("/scriptevent talismans:<название> - получить талисман");
    } if (id == "talismans:list") {
        let allTalismans = [];
        for (const talisman of talismans) {
            allTalismans.push(talisman.name);
        }
        if (!allTalismans.length) return player.sendMessage("Доступных талисманов нет!");
        player.sendMessage("Доступные талисманы: §6" + allTalismans.join("§r, §6"));
    } else {
        for (const talisman of talismans) {
            if (id !== "talismans:" + talisman.name) continue;
            const item = new ItemStack(talisman.typeId);
            item.setLore(talisman.lore);
            item.nameTag = talisman.nameTag;
            player.getComponent("inventory").container.addItem(item);
            return;
        }
    }
}, { namespaces: ["talismans"] });
