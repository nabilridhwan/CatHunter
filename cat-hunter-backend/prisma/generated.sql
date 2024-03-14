-- CreateTable
CREATE TABLE `post` (
    `post_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `caption` VARCHAR(191) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,
    `likes` INTEGER NOT NULL,
    `comments` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `post_user_id_fkey`(`user_id` ASC),
    PRIMARY KEY (`post_id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_comments` (
    `comment_id` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `post_comments_post_id_fkey`(`post_id` ASC),
    INDEX `post_comments_user_id_fkey`(`user_id` ASC),
    PRIMARY KEY (`comment_id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_reaction` (
    `reaction_id` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `post_reaction_post_id_fkey`(`post_id` ASC),
    INDEX `post_reaction_user_id_fkey`(`user_id` ASC),
    PRIMARY KEY (`reaction_id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,

    UNIQUE INDEX `user_email_key`(`email` ASC),
    UNIQUE INDEX `user_username_key`(`username` ASC),
    PRIMARY KEY (`user_id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_comments` ADD CONSTRAINT `post_comments_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post`(`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_comments` ADD CONSTRAINT `post_comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_reaction` ADD CONSTRAINT `post_reaction_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post`(`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_reaction` ADD CONSTRAINT `post_reaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

