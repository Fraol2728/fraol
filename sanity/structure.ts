import { DocumentIcon, EditIcon, UserIcon, WrenchIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Portfolio")
        .icon(DocumentIcon)
        .child(
          S.list()
            .title("Portfolio")
            .items([
              S.documentTypeListItem("project").title("Projects"),
              S.documentTypeListItem("post").title("Posts"),
            ])
        ),
      S.listItem()
        .title("Settings")
        .icon(WrenchIcon)
        .child(
          S.list()
            .title("Settings")
            .items([
              S.documentTypeListItem("service").title("Services").icon(EditIcon),
              S.documentTypeListItem("about").title("About").icon(UserIcon),
            ])
        ),
    ]);
