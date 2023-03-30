-- CreateTable
CREATE TABLE `catalog_item` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `page_id` INTEGER UNSIGNED NOT NULL,
    `item_id` INTEGER UNSIGNED NOT NULL,
    `catalog_name` VARCHAR(100) NOT NULL,
    `cost_credits` INTEGER UNSIGNED NOT NULL DEFAULT 3,
    `cost_pixels` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `cost_diamonds` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `cost_limitcoins` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `amount` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `offer_active` BOOLEAN NOT NULL DEFAULT true,
    `badge` VARCHAR(255) NOT NULL DEFAULT '',

    INDEX `item_ids`(`item_id`),
    INDEX `page_id`(`page_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `catalog_item_limited` (
    `catalog_item_id` INTEGER UNSIGNED NOT NULL,
    `limited_sells` INTEGER NOT NULL DEFAULT 0,
    `limited_stack` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`catalog_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `catalog_page` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NOT NULL DEFAULT -1,
    `caption` VARCHAR(100) NOT NULL,
    `icon_image` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `min_rank` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `required_right` VARCHAR(50) NOT NULL DEFAULT '',
    `order_num` INTEGER NOT NULL DEFAULT 0,
    `page_layout` VARCHAR(50) NOT NULL DEFAULT 'default_3x3',
    `page_link` VARCHAR(255) NOT NULL DEFAULT '',
    `page_strings_1` VARCHAR(255) NOT NULL DEFAULT 'wibbo|catalog_base',
    `page_strings_2` TEXT NOT NULL,
    `is_premium` BOOLEAN NOT NULL DEFAULT false,

    INDEX `order_num`(`order_num`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emulator_command` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `input` VARCHAR(100) NOT NULL,
    `minrank` INTEGER NOT NULL,
    `description_fr` MEDIUMTEXT NULL,
    `description_en` MEDIUMTEXT NULL,
    `description_br` MEDIUMTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emulator_effect` (
    `id` INTEGER UNSIGNED NOT NULL,
    `only_staff` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emulator_text` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `identifiant` VARCHAR(200) NOT NULL,
    `value_fr` TEXT NULL,
    `value_en` TEXT NULL,
    `value_br` TEXT NULL,

    PRIMARY KEY (`id`, `identifiant`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_base` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `item_name` VARCHAR(100) NOT NULL,
    `type` ENUM('s', 'i', 'p', 'r') NOT NULL DEFAULT 's',
    `width` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `length` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `stack_height` DOUBLE NOT NULL DEFAULT 1,
    `can_stack` BOOLEAN NOT NULL DEFAULT true,
    `can_sit` BOOLEAN NOT NULL DEFAULT false,
    `is_walkable` BOOLEAN NOT NULL DEFAULT false,
    `sprite_id` INTEGER UNSIGNED NOT NULL,
    `allow_recycle` BOOLEAN NOT NULL DEFAULT false,
    `allow_trade` BOOLEAN NOT NULL DEFAULT true,
    `allow_marketplace_sell` BOOLEAN NOT NULL DEFAULT false,
    `allow_gift` BOOLEAN NOT NULL DEFAULT true,
    `allow_inventory_stack` BOOLEAN NOT NULL DEFAULT true,
    `interaction_type` VARCHAR(255) NOT NULL DEFAULT 'default',
    `interaction_modes_count` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `vending_ids` VARCHAR(100) NOT NULL DEFAULT '0',
    `height_adjustable` VARCHAR(100) NOT NULL DEFAULT '0',
    `effect_id` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `is_rare` BOOLEAN NOT NULL DEFAULT false,
    `rarity_level` INTEGER NOT NULL DEFAULT 0,

    INDEX `sprite_id`(`sprite_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `mail` VARCHAR(100) NULL DEFAULT '',
    `auth_ticket` VARCHAR(100) NULL DEFAULT '',
    `rank` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `credits` INTEGER UNSIGNED NOT NULL DEFAULT 50000,
    `activity_points` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `look` VARCHAR(250) NOT NULL DEFAULT 'hr-115-42.hd-190-1.ch-215-62.lg-285-91.sh-290-62',
    `gender` ENUM('M', 'F') NOT NULL DEFAULT 'M',
    `motto` VARCHAR(50) NULL DEFAULT '',
    `account_created` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `last_online` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `online` BOOLEAN NOT NULL DEFAULT false,
    `ip_last` VARCHAR(120) NULL DEFAULT '',
    `machine_id` VARCHAR(100) NULL DEFAULT '',
    `home_room` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `block_newfriends` BOOLEAN NOT NULL DEFAULT false,
    `hide_online` BOOLEAN NOT NULL DEFAULT false,
    `hide_inroom` BOOLEAN NOT NULL DEFAULT false,
    `last_offline` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `jetons` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `mois_vip` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `volume` VARCHAR(11) NOT NULL DEFAULT '100,100,100',
    `vip_points` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `limit_coins` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `accept_trading` BOOLEAN NOT NULL DEFAULT true,
    `camera_follow_disabled` BOOLEAN NOT NULL DEFAULT false,
    `ignore_room_invite` BOOLEAN NOT NULL DEFAULT false,
    `lastdailycredits` VARCHAR(10) NOT NULL DEFAULT '00/00',
    `hide_gamealert` BOOLEAN NOT NULL DEFAULT false,
    `ipcountry` VARCHAR(2) NULL DEFAULT '',
    `game_points` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `game_points_month` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `mazoscore` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `mazo` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `nux_enable` BOOLEAN NOT NULL DEFAULT true,
    `langue` ENUM('fr', 'br', 'en') NOT NULL DEFAULT 'fr',
    `run_points` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `run_points_month` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `is_banned` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `username`(`username`),
    INDEX `auth_ticket`(`auth_ticket`),
    INDEX `gamepoint`(`game_points`),
    INDEX `gamepoint_mouth`(`game_points_month`),
    INDEX `ip_last`(`ip_last`),
    INDEX `jetons`(`jetons`),
    INDEX `mail`(`mail`),
    INDEX `mazo`(`mazo`),
    INDEX `mazoscore`(`mazoscore`),
    INDEX `vip_points`(`vip_points`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_sandbox` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `method` VARCHAR(10) NOT NULL,
    `edit_name` VARCHAR(20) NOT NULL,
    `edit_key` VARCHAR(200) NOT NULL,
    `timestamp_created` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `log_sandbox` ADD CONSTRAINT `log_sandbox_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

