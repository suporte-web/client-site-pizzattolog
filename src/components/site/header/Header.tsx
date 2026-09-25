"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import type { ItemMenu, MenuNavegacao } from "@/types/site";
import { normalizeSitePath } from "@/utils/routes";

interface HeaderProps {
  nomeEmpresa: string;
  menus: MenuNavegacao[];
}

const logoUrl = './';

function getHref(url: string | null | undefined, slug: string) {
  return normalizeSitePath(url, `/${slug}`);
}

const topicosSolucoes = new Set([
  "transporte-de-cargas",
  "armazenagem",
  "operador-logistico",
]);

const menusComCliqueDireto = new Set(["solucoes"]);

function normalizePathname(path: string) {
  return path.replace(/\/$/, "") || "/";
}

function encontrarItemPorSlug(
  itens: ItemMenu[],
  slug: string,
): ItemMenu | null {
  for (const item of itens) {
    if (item.slug === slug) {
      return item;
    }

    if (item.filhos?.length) {
      const encontrado = encontrarItemPorSlug(
        item.filhos,
        slug,
      );

      if (encontrado) {
        return encontrado;
      }
    }
  }

  return null;
}

function removerItemPorSlug(
  itens: ItemMenu[],
  slug: string,
): ItemMenu[] {
  return itens
    .filter((item) => item.slug !== slug)
    .map((item) => ({
      ...item,

      filhos: item.filhos?.length
        ? removerItemPorSlug(item.filhos, slug)
        : item.filhos,
    }));
}

function renderDesktopItems(
  itens: ItemMenu[],
  fecharMenu: () => void,
  itemExpandido: string | null,
  alternarItem: (id: string) => void,
  nivel = 0,
): ReactNode[] {
  return itens.flatMap((item) => {
    const filhos = item.filhos ?? [];
    const aberto = itemExpandido === item.id;
    const linkDireto = topicosSolucoes.has(item.slug);

    if (filhos.length && !linkDireto) {
      return [
        <Fragment key={item.id}>
          <MenuItem
            component="button"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              alternarItem(item.id);
            }}
            sx={{
              width: '100%',
              minHeight: 42,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              textAlign: 'left',
              py: 1,
              pl: 1.75 + nivel * 2,
              pr: 2,
              fontWeight: 800,
              color: "text.primary",
              bgcolor: "rgba(23,69,107,0.04)",
              "&:hover": {
                bgcolor: "rgba(23,69,107,0.08)",
              },
            }}
          >
            <ListItemText
              primary={item.titulo}
              sx={{
                m: 0,
                minWidth: 0,
                flex: '1 1 auto',
                textAlign: 'left',
              }}
              slotProps={{
                primary: {
                  sx: {
                    fontSize: 15.5,
                    fontWeight: 850,
                    lineHeight: 1.35,
                    textAlign: 'left',
                    overflowWrap: 'anywhere',
                  },
                },
              }}
            />
          </MenuItem>
          <Collapse in={aberto} timeout="auto" unmountOnExit>
            {renderDesktopItems(filhos, fecharMenu, itemExpandido, alternarItem, nivel + 1)}
          </Collapse>
        </Fragment>,
      ];
    }

    return [
      <MenuItem
        key={item.id}
        component={Link}
        href={getHref(item.url, item.slug)}
        onClick={fecharMenu}
        sx={{
          minHeight: 42,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          textAlign: 'left',
          py: 1,
          pl: 1.75 + nivel * 2,
          pr: 2,
          fontWeight: 500,
          color: "text.primary",
          bgcolor: "transparent",
          "&:hover": {
            bgcolor: "rgba(23,69,107,0.08)",
          },
        }}
      >
        <ListItemText
          primary={item.titulo}
          sx={{
            m: 0,
            minWidth: 0,
            flex: '1 1 auto',
            textAlign: 'left',
          }}
          slotProps={{
            primary: {
              sx: {
                fontSize: 15.5,
                fontWeight: 600,
                lineHeight: 1.35,
                textAlign: 'left',
                overflowWrap: 'anywhere',
              },
            },
          }}
        />
      </MenuItem>,
    ];
  });
}

function renderMobileItems(
  itens: ItemMenu[],
  fecharMobile: () => void,
  itensExpandidos: Set<string>,
  alternarItem: (id: string) => void,
  nivel = 0,
): ReactNode[] {
  return itens.flatMap((item) => {
    const filhos = item.filhos ?? [];
    const aberto = itensExpandidos.has(item.id);
    const linkDireto = topicosSolucoes.has(item.slug);

    if (filhos.length && !linkDireto) {
      return [
        <Fragment key={item.id}>
          <ListItemButton
            onClick={() => alternarItem(item.id)}
            sx={{ py: 0.75, pl: 2 + nivel * 2.5, borderRadius: 1 }}
          >
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 800, color: "text.primary", overflowWrap: 'anywhere' }}>
                  {item.titulo}
                </Typography>
              }
            />
          </ListItemButton>
          <Collapse in={aberto} timeout="auto" unmountOnExit>
            {renderMobileItems(filhos, fecharMobile, itensExpandidos, alternarItem, nivel + 1)}
          </Collapse>
        </Fragment>,
      ];
    }

    return [
      <ListItemButton
        key={item.id}
        component={Link}
        href={getHref(item.url, item.slug)}
        onClick={fecharMobile}
        sx={{ py: 0.75, pl: 2 + nivel * 2.5, borderRadius: 1 }}
      >
        <ListItemText
          primary={
            <Typography
              sx={{
                fontWeight: filhos.length ? 800 : 500,
                color: filhos.length ? "text.primary" : "text.secondary",
                overflowWrap: 'anywhere',
              }}
            >
              {item.titulo}
            </Typography>
          }
        />
      </ListItemButton>,
    ];
  });
}

export function Header({ menus, nomeEmpresa }: HeaderProps) {
  const pathname = usePathname();

  const itemEsg =
    menus
      .map((menu) => encontrarItemPorSlug(menu.itens, "esg"))
      .find((item): item is ItemMenu => item !== null) ?? null;

  const menusSemEsg = menus.map((menu) => ({
    ...menu,
    itens: removerItemPorSlug(menu.itens, "esg"),
  }));

  const [menuAtual, setMenuAtual] = useState<HTMLElement | null>(null);
  const [indiceAtual, setIndiceAtual] = useState<number | null>(null);
  const [menuEsgAtual, setMenuEsgAtual] =
    useState<HTMLElement | null>(null);
  const [mobileAberto, setMobileAberto] = useState(false);
  const [itemDesktopExpandido, setItemDesktopExpandido] = useState<string | null>(null);
  const [itensMobileExpandidos, setItensMobileExpandidos] = useState<Set<string>>(new Set());

  const abrirMenu = (event: MouseEvent<HTMLElement>, indice: number) => {
    setMenuEsgAtual(null);
    setMenuAtual(event.currentTarget);
    setIndiceAtual(indice);
    setItemDesktopExpandido(null);
  };

  const abrirMenuEsg = (event: MouseEvent<HTMLElement>) => {
    setMenuAtual(null);
    setIndiceAtual(null);
    setItemDesktopExpandido(null);
    setMenuEsgAtual(event.currentTarget);
  };

  const navegarParaTopoSeMesmaPagina = (event: MouseEvent<HTMLElement>, href: string) => {
    const [path] = href.split("#");

    if (normalizePathname(pathname) === normalizePathname(path)) {
      event.preventDefault();
      window.history.pushState(null, "", path);
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    fecharMenu();
  };

  const fecharMenu = () => {
    setMenuAtual(null);
    setMenuEsgAtual(null);
    setIndiceAtual(null);
    setItemDesktopExpandido(null);
  };

  const alternarItemDesktop = (id: string) => {
    setItemDesktopExpandido((atual) => (atual === id ? null : id));
  };

  const alternarItemMobile = (id: string) => {
    setItensMobileExpandidos((atuais) => {
      const proximos = new Set(atuais);

      if (proximos.has(id)) {
        proximos.delete(id);
      } else {
        proximos.add(id);
      }

      return proximos;
    });
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(255,255,255,0.86)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: 90,
              gap: 2,
              pt: 1.5,
              pb: 1,
            }}
          >
            <Stack
              component={Link}
              href="/"
              direction="row"
              spacing={1.2}
              sx={{
                alignItems: "center",
                mr: { xs: 1, lg: 4 },
              }}
            >
              <Box
                component="img"
                src="/images/logo/logopreta.png"
                alt={nomeEmpresa}
                sx={{
                  width: {
                    xs: 150,
                    md: 180,
                  },
                  height: 'auto',
                }}
              />
            </Stack>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{ display: { xs: "none", lg: "flex" } }}
            >
              {menusSemEsg.map((menu, indice) => (
                <Fragment key={menu.id}>
                  {menu.itens.length &&
                    menusComCliqueDireto.has(menu.slug) ? (
                    <Button
                      color="inherit"
                      component={Link}
                      href={getHref(menu.url, menu.slug)}
                      scroll
                      onClick={(
                        event: MouseEvent<HTMLElement>,
                      ) =>
                        navegarParaTopoSeMesmaPagina(
                          event,
                          getHref(menu.url, menu.slug),
                        )
                      }
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      {menu.titulo}
                    </Button>
                  ) : menu.itens.length ? (
                    <Button
                      color="inherit"
                      onClick={(
                        event: MouseEvent<HTMLElement>,
                      ) => abrirMenu(event, indice)}
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      {menu.titulo}
                    </Button>
                  ) : (
                    <Button
                      color="inherit"
                      component={Link}
                      href={getHref(menu.url, menu.slug)}
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      {menu.titulo}
                    </Button>
                  )}

                  {/* ============================================
        ESG DEPOIS DE SEGMENTOS
    ============================================ */}

                  {(menu.slug === "segmentos" ||
                    menu.titulo.trim().toLowerCase() === "segmentos") &&
                    itemEsg && (
                      <Button
                        color="inherit"
                        onClick={abrirMenuEsg}
                        sx={{
                          color: "text.secondary",
                        }}
                      >
                        ESG
                      </Button>
                    )}

                </Fragment>
              ))}
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Button
              variant="contained"
              color="secondary"
              component={Link}
              href="/solicitar-cotacao"
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              Solicitar cotação
            </Button>

            <IconButton
              aria-label="Abrir menu"
              onClick={() => setMobileAberto(true)}
              sx={{ display: { lg: "none" } }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={menuAtual}
        open={Boolean(menuAtual)}
        onClose={fecharMenu}
        slotProps={{
          paper: {
            sx: {
              mt: 1.25,
              minWidth: 290,
              maxWidth: 360,
              maxHeight: "calc(100vh - 96px)",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              overflow: 'hidden',
              boxShadow: "0 18px 42px rgba(15,23,42,0.18)",
            },
          },
          list: {
            sx: {
              py: 0.75,
            },
          },
        }}
      >
        {indiceAtual !== null
          ? renderDesktopItems(menusSemEsg[indiceAtual].itens, fecharMenu, itemDesktopExpandido, alternarItemDesktop)
          : null}
      </Menu>
      {/* =====================================================
    MENU ESG
====================================================== */}

      <Menu
        anchorEl={menuEsgAtual}
        open={Boolean(menuEsgAtual)}
        onClose={() => setMenuEsgAtual(null)}
        slotProps={{
          paper: {
            sx: {
              mt: 1.25,

              minWidth: 220,

              borderRadius: 2,

              border: "1px solid",
              borderColor: "divider",

              boxShadow:
                "0 18px 42px rgba(15,23,42,0.18)",
            },
          },

          list: {
            sx: {
              py: 0.75,
            },
          },
        }}
      >
        {itemEsg
          ? renderDesktopItems(
            itemEsg.filhos ?? [],
            () => setMenuEsgAtual(null),
            itemDesktopExpandido,
            alternarItemDesktop,
          )
          : null}
      </Menu>

      <Drawer
        anchor="right"
        open={mobileAberto}
        onClose={() => setMobileAberto(false)}
      >
        <Box sx={{ width: { xs: 'min(100vw, 340px)', sm: 360 }, boxSizing: 'border-box', p: 2 }}>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>Navegação</Typography>
            <IconButton aria-label="Fechar menu" onClick={() => setMobileAberto(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Divider />
          <List>
            {menusSemEsg.map((menu) => (
              <Fragment key={menu.id}>
                <Box sx={{ mb: 1 }}>
                  <ListItemButton
                    component={
                      menu.itens.length && !menusComCliqueDireto.has(menu.slug)
                        ? "button"
                        : Link
                    }
                    href={
                      menu.itens.length && !menusComCliqueDireto.has(menu.slug)
                        ? undefined
                        : getHref(menu.url, menu.slug)
                    }
                    onClick={(event: MouseEvent<HTMLElement>) => {
                      if (
                        menu.itens.length &&
                        !menusComCliqueDireto.has(menu.slug)
                      ) {
                        alternarItemMobile(menu.id);
                      } else {
                        setMobileAberto(false);
                        navegarParaTopoSeMesmaPagina(
                          event,
                          getHref(menu.url, menu.slug),
                        );
                      }
                    }}
                    sx={{ py: 1, width: "100%" }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontWeight: 800,
                            color: "primary.main",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {menu.titulo}
                        </Typography>
                      }
                    />
                  </ListItemButton>

                  <Collapse
                    in={itensMobileExpandidos.has(menu.id)}
                    timeout="auto"
                    unmountOnExit
                  >
                    {renderMobileItems(
                      menu.itens,
                      () => setMobileAberto(false),
                      itensMobileExpandidos,
                      alternarItemMobile,
                      1,
                    )}
                  </Collapse>
                </Box>

                {(menu.slug === "segmentos" ||
                  menu.titulo.trim().toLowerCase() === "segmentos") &&
                  itemEsg && (
                    <Box sx={{ mb: 1 }}>
                      <ListItemButton
                        onClick={() => alternarItemMobile("menu-esg-mobile")}
                        sx={{ py: 1, width: "100%" }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                fontWeight: 800,
                                color: "primary.main",
                              }}
                            >
                              ESG
                            </Typography>
                          }
                        />
                      </ListItemButton>

                      <Collapse
                        in={itensMobileExpandidos.has("menu-esg-mobile")}
                        timeout="auto"
                        unmountOnExit
                      >
                        {renderMobileItems(
                          itemEsg.filhos ?? [],
                          () => setMobileAberto(false),
                          itensMobileExpandidos,
                          alternarItemMobile,
                          1,
                        )}
                      </Collapse>
                    </Box>
                  )}
              </Fragment>
            ))}
          </List>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            href="/solicitar-cotacao"
            onClick={() => setMobileAberto(false)}
          >
            Solicitar cotação
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
