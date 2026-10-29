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
  Popper,
  Paper,
  MenuItem,
  MenuList,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import type { ItemMenu, MenuNavegacao } from "@/types/site";
import { normalizeSitePath } from "@/utils/routes";

interface HeaderProps {
  nomeEmpresa: string;
  menus: MenuNavegacao[];
}

function getHref(url: string | null | undefined, slug: string) {
  return normalizeSitePath(url, `/${slug}`);
}

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
      const encontrado = encontrarItemPorSlug(item.filhos, slug);

      if (encontrado) {
        return encontrado;
      }
    }
  }

  return null;
}

function removerItemPorSlug(itens: ItemMenu[], slug: string): ItemMenu[] {
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

    if (filhos.length) {
      return [
        <Fragment key={item.id}>
          <MenuItem
            tabIndex={0}
            component={Link}
            href={getHref(item.url, item.slug)}
            onClick={fecharMenu}
            onMouseEnter={() => alternarItem(item.id)}
            onFocus={() => alternarItem(item.id)}
            sx={{
              width: "100%",
              minHeight: 42,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              textAlign: "left",
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
                flex: "1 1 auto",
                textAlign: "left",
              }}
              slotProps={{
                primary: {
                  sx: {
                    fontSize: 15.5,
                    fontWeight: 850,
                    lineHeight: 1.35,
                    textAlign: "left",
                    overflowWrap: "anywhere",
                  },
                },
              }}
            />
          </MenuItem>
          <Collapse in={aberto} timeout="auto" unmountOnExit>
            {renderDesktopItems(
              filhos,
              fecharMenu,
              itemExpandido,
              alternarItem,
              nivel + 1,
            )}
          </Collapse>
        </Fragment>,
      ];
    }

    return [
      <MenuItem
        tabIndex={0}
        key={item.id}
        component={Link}
        href={getHref(item.url, item.slug)}
        onClick={fecharMenu}
        sx={{
          minHeight: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "left",
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
            flex: "1 1 auto",
            textAlign: "left",
          }}
          slotProps={{
            primary: {
              sx: {
                fontSize: 15.5,
                fontWeight: 600,
                lineHeight: 1.35,
                textAlign: "left",
                overflowWrap: "anywhere",
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

    if (filhos.length) {
      return [
        <Fragment key={item.id}>
          <ListItemButton
            component={Link}
            href={getHref(item.url, item.slug)}
            onClick={fecharMobile}
            sx={{ py: 0.75, pl: 2 + nivel * 2.5, borderRadius: 1 }}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "text.primary",
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.titulo}
                </Typography>
              }
            />
          </ListItemButton>
          <Button
            onClick={() => alternarItem(item.id)}
            aria-expanded={aberto}
            aria-label={`Exibir subcategorias de ${item.titulo}`}
            size="small"
            sx={{ ml: 2 + nivel * 2.5 }}
          >
            {aberto ? "Ocultar subcategorias" : "Exibir subcategorias"}
          </Button>
          <Collapse in={aberto} timeout="auto" unmountOnExit>
            {renderMobileItems(
              filhos,
              fecharMobile,
              itensExpandidos,
              alternarItem,
              nivel + 1,
            )}
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
                overflowWrap: "anywhere",
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
  const [menuEsgAtual, setMenuEsgAtual] = useState<HTMLElement | null>(null);
  const [mobileAberto, setMobileAberto] = useState(false);
  const [itemDesktopExpandido, setItemDesktopExpandido] = useState<
    string | null
  >(null);
  const [itensMobileExpandidos, setItensMobileExpandidos] = useState<
    Set<string>
  >(new Set());

  const fechamentoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const manterMenu = () => {
    if (fechamentoTimer.current) clearTimeout(fechamentoTimer.current);
  };
  const agendarFechamento = () => {
    manterMenu();
    fechamentoTimer.current = setTimeout(() => fecharMenu(), 180);
  };
  useEffect(
    () => () => {
      if (fechamentoTimer.current) clearTimeout(fechamentoTimer.current);
    },
    [],
  );

  const abrirMenu = (event: { currentTarget: HTMLElement }, indice: number) => {
    manterMenu();
    setMenuEsgAtual(null);
    setMenuAtual(event.currentTarget);
    setIndiceAtual(indice);
    setItemDesktopExpandido(null);
  };

  const abrirMenuEsg = (event: { currentTarget: HTMLElement }) => {
    manterMenu();
    setMenuAtual(null);
    setIndiceAtual(null);
    setItemDesktopExpandido(null);
    setMenuEsgAtual(event.currentTarget);
  };

  const navegarParaTopoSeMesmaPagina = (
    event: MouseEvent<HTMLElement>,
    href: string,
  ) => {
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
    setItemDesktopExpandido(id);
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
        elevation={7}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(255,255,255,0.7)",
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
              display: { xs: "flex", lg: "grid" },
              gridTemplateColumns: { lg: "1fr auto 1fr" },
              gridTemplateRows: { lg: "auto" },
              alignContent: "center",
              alignItems: { xs: "center", lg: "end" },
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Stack
              component={Link}
              href="/"
              direction="row"
              spacing={1.2}
              sx={{
                alignItems: "center",
                flexShrink: 0,
                mr: 0,
                zIndex: 2,
                justifySelf: "start",
              }}
            >
              <Box
                component="img"
                src="/images/logo/logopreta1.png"
                alt={nomeEmpresa}
                sx={{
                  width: {
                    xs: 150,
                    md: 180,
                  },
                  height: "auto",
                  display: "block",
                }}
              />
            </Stack>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                whiteSpace: "nowrap",
                zIndex: 1,
              }}
            >
              {menusSemEsg.map((menu, indice) => (
                <Fragment key={menu.id}>
                  <Button
                    color="inherit"
                    component={Link}
                    href={getHref(menu.url, menu.slug).split("#")[0]}
                    scroll
                    onClick={(event: MouseEvent<HTMLElement>) =>
                      navegarParaTopoSeMesmaPagina(
                        event,
                        getHref(menu.url, menu.slug),
                      )
                    }
                    onMouseEnter={(event) =>
                      menu.itens.length
                        ? abrirMenu(event, indice)
                        : fecharMenu()
                    }
                    onMouseLeave={agendarFechamento}
                    onFocus={(event) =>
                      menu.itens.length
                        ? abrirMenu(event, indice)
                        : fecharMenu()
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Escape") fecharMenu();
                    }}
                    aria-expanded={
                      menu.itens.length ? indiceAtual === indice : undefined
                    }
                    aria-controls={
                      indiceAtual === indice ? `submenu-${menu.id}` : undefined
                    }
                    sx={{ color: "text.secondary" }}
                  >
                    {menu.titulo}
                  </Button>

                  {/* ============================================
        ESG DEPOIS DE SEGMENTOS
    ============================================ */}

                  {(menu.slug === "segmentos" ||
                    menu.titulo.trim().toLowerCase() === "segmentos") &&
                    itemEsg && (
                      <Button
                        color="inherit"
                        component={Link}
                        href={getHref(itemEsg.url, itemEsg.slug).split("#")[0]}
                        onClick={(event: MouseEvent<HTMLElement>) =>
                          navegarParaTopoSeMesmaPagina(
                            event,
                            getHref(itemEsg.url, itemEsg.slug),
                          )
                        }
                        onFocus={abrirMenuEsg}
                        onMouseEnter={abrirMenuEsg}
                        onMouseLeave={agendarFechamento}
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

            <Box sx={{ flexGrow: 1, display: { lg: "none" } }} />

            <Button
              variant="contained"
              color="secondary"
              component={Link}
              href="/solicitar-cotacao"
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                justifySelf: "end",
              }}
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

      <Popper
        anchorEl={menuAtual ?? menuEsgAtual}
        open={Boolean(menuAtual ?? menuEsgAtual)}
        placement="bottom-start"
        sx={{ zIndex: 1200 }}
      >
        <Paper
          id={
            indiceAtual !== null
              ? `submenu-${menusSemEsg[indiceAtual].id}`
              : "submenu-esg"
          }
          onMouseEnter={manterMenu}
          onMouseLeave={agendarFechamento}
          onKeyDown={(event) => {
            if (event.key === "Escape") fecharMenu();
          }}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            )
              fecharMenu();
          }}
          sx={{
            mt: 1,
            minWidth: 290,
            maxWidth: 360,
            maxHeight: "calc(100vh - 110px)",
            overflowY: "auto",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 18px 42px rgba(15,23,42,0.18)",
            py: 0.75,
          }}
        >
          <MenuList disablePadding>
            {renderDesktopItems(
              indiceAtual !== null
                ? menusSemEsg[indiceAtual].itens
                : (itemEsg?.filhos ?? []),
              fecharMenu,
              itemDesktopExpandido,
              alternarItemDesktop,
            )}
          </MenuList>
        </Paper>
      </Popper>

      <Drawer
        anchor="right"
        open={mobileAberto}
        onClose={() => setMobileAberto(false)}
      >
        <Box
          sx={{
            width: { xs: "min(100vw, 340px)", sm: 360 },
            boxSizing: "border-box",
            p: 2,
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>Navegação</Typography>
            <IconButton
              aria-label="Fechar menu"
              onClick={() => setMobileAberto(false)}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Divider />
          <List>
            {menusSemEsg.map((menu) => (
              <Fragment key={menu.id}>
                <Box sx={{ mb: 1 }}>
                  <ListItemButton
                    component={Link}
                    href={getHref(menu.url, menu.slug).split("#")[0]}
                    onClick={(event: MouseEvent<HTMLElement>) => {
                      setMobileAberto(false);
                      navegarParaTopoSeMesmaPagina(
                        event,
                        getHref(menu.url, menu.slug),
                      );
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

                  {menu.itens.length > 0 && (
                    <Button
                      onClick={() => alternarItemMobile(menu.id)}
                      aria-expanded={itensMobileExpandidos.has(menu.id)}
                      aria-label={`Exibir subcategorias de ${menu.titulo}`}
                      size="small"
                    >
                      {itensMobileExpandidos.has(menu.id)
                        ? "Ocultar subcategorias"
                        : "Exibir subcategorias"}
                    </Button>
                  )}
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
