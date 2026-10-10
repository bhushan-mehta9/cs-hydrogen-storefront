import {Breadcrumb} from '~/components/local/Breadcrumb';
import {Container} from '~/components/local/Container';

/**
 * @param {{
 *   breadcrumb: Array<{to?: string; label: string}>;
 *   eyebrow?: string;
 *   title: string;
 *   subtitle?: string;
 *   wide?: boolean;
 *   children: React.ReactNode;
 * }}
 */
export function ContentPageShell({
  breadcrumb,
  eyebrow,
  title,
  subtitle,
  wide = false,
  children,
}) {
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <Container
        className={`py-10 md:py-14 ${wide ? '!max-w-6xl' : '!max-w-4xl'}`}
      >
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.2em] text-primary-700 mb-2">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-local-muted text-lg mb-8 max-w-2xl">{subtitle}</p>
        ) : null}
        {children}
      </Container>
    </>
  );
}
