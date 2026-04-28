// Sapphirium dedicated Tech Tree
// Defines hub blocks for Serpulo and Erekir, then reparents all mod root nodes under them.

const hubSerpulo = extend(Block, "hub-serpulo", {
    size: 1,
    update: false,
    hasItems: false,
    hasPower: false,
    category: Category.effect
});

const hubErekir = extend(Block, "hub-erekir", {
    size: 1,
    update: false,
    hasItems: false,
    hasPower: false,
    category: Category.production
});

// ---------------------------------------------------------------------------
// Reparent logic: runs after all content (including vanilla) has been loaded.
// ---------------------------------------------------------------------------

// Root blocks in Serpulo that currently have a vanilla research parent (before reparenting).
// Moving each of these under the hub pulls their entire sub-tree along.
// Each entry is the short mod name (without "sapphirium-" prefix).
var serpuloRoots = [
    // distribution
    "creostone-conveyor",
    "creostone-bridge-conveyor",
    "compact-driver",
    "creostone-router",
    "creostone-junction",
    // liquid
    "creostone-conduit",
    "strong-conduit",
    "creostone-bridge-conduit",
    "armored-liquid-container",
    "upgraded-pump",
    // production
    "dense-smelter",
    "tinorium-crystallizer",
    "creotite-mixer",
    "cryofluid-megamixer",
    "electromixer",
    "big-blast-mixer",
    "globium-smelter",
    "impulse-surge-smelter",
    "plastanium-press",
    "phase-sewing-factory",
    "spore-extractor",
    "copper-transformer",
    "melinite",
    "wire",
    "weak-charger",
    "sand-mine",
    // drills
    "oil-pump",
    "smalldrill",
    // defense
    "creostone-mine",
    // storage
    "core-cage",
    "emerald-core",
    "armored-container",
    "creostone-storage",
    // effect
    "flashlight",
    // walls
    "dense-wall",
    "ice-cube-wall",
    "emerald-wall",
    "charged-lead-wall",
    "reinforced-wall",
    "globium-wall",
    // turrets
    "pulse",
    "enlightenment",
    "sparrow",
    "cast",
    "frostbite",
    // units
    "base-fabricator"
];

// Root blocks in Erekir that currently have a vanilla research parent (before reparenting).
var erekirRoots = [
    // drills
    "rift-borehole",
    // liquid
    "topaz-conduit",
    // power
    "mineralizer",
    "creostone-beam-node",
    // production
    "neoplasm-converter",
    "sapphire-synthesizer",
    // defense
    "sapphire-restorer",
    // walls
    "sapphire-wall",
    "carved-wall",
    // turrets
    "crackle",
    "multimortar",
    // storage
    "tesla",
    // units
    "difference-factory",
    "faith-fabricator",
    "ghost-fabricator",
    "hunters-fabricator"
];

function reparentBlocks(roots, hubBlock) {
    var hubNode = hubBlock.techNode;
    if (!hubNode) {
        Log.warn("[Sapphirium] Hub block '@' has no techNode – reparenting skipped.", hubBlock.name);
        return;
    }
    roots.forEach(function(shortName) {
        var fullName = "sapphirium-" + shortName;
        var block = Vars.content.block(fullName);
        if (!block || !block.techNode) {
            // Not found or not in tech tree – skip silently
            return;
        }
        var node = block.techNode;
        if (node.parent) {
            node.parent.children.remove(node);
        }
        node.parent = hubNode;
        hubNode.children.add(node);
    });
}

Events.on(EventType.ClientLoadEvent, function() {
    reparentBlocks(serpuloRoots, hubSerpulo);
    reparentBlocks(erekirRoots, hubErekir);
});
