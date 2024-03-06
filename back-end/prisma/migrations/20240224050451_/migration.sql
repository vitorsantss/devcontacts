/*
  Warnings:

  - You are about to drop the `UsersOnContacts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UsersOnContacts";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT,
    "github" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("email", "github", "id", "name", "phone", "position") SELECT "email", "github", "id", "name", "phone", "position" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");
CREATE UNIQUE INDEX "Contact_phone_key" ON "Contact"("phone");
CREATE UNIQUE INDEX "Contact_github_key" ON "Contact"("github");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
