

export interface Character {
    name: string
    realm: string
    battlegroup: string
    class: number
    race: number
    gender: number
    level: number
    achievementPoints: number
    thumbnail: string
    calcClass: string
    faction: number
    totalHonorableKills: number
    items: Items
}

interface Items {
    averageItemLevel: number
    averageItemLevelEquipped: number
    head: Item
    neck: Item
    shoulder: Item
    back: Item
    chest: Item
    wrist: Item
    hands: Item
    waist: Item
    legs: Item
    feet: Item
    finger1: Item
    finger2: Item
    trinket1: Item
    trinket2: Item
    mainHand: Item
    offHand?: Item
}

interface Item {
    id: number
    name: string
    itemLevel: number
}