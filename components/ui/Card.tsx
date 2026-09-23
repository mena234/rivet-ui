import type { HTMLAttributes, ReactNode } from "react";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  action?: ReactNode;
  span?: "default" | "wide" | "tall";
}

export function Card({
  className,
  title,
  description,
  action,
  span = "default",
  children,
  ...props
}: CardProps) {
  return (
    <article className={cn("rv-card", className)} data-span={span} {...props}>
      {title || description || action ? (
        <header className="rv-card__header">
          <div>
            {title ? <h3>{title}</h3> : null}
            {description ? <p>{description}</p> : null}
          </div>
          {action}
        </header>
      ) : null}
      {children}
    </article>
  );
}

export interface ProjectCardProps {
  name: string;
  description: string;
  status: string;
  statusTone?: BadgeTone;
  progress: number;
  due: string;
  members: string[];
  onOpen?: () => void;
  span?: CardProps["span"];
}

export function ProjectCard({
  name,
  description,
  status,
  statusTone = "neutral",
  progress,
  due,
  members,
  onOpen,
  span,
}: ProjectCardProps) {
  return (
    <Card
      className="rv-project-card"
      span={span}
      title={name}
      description={description}
      action={
        <Button variant="quiet" size="icon" aria-label={`Open actions for ${name}`}>
          <MoreHorizontal aria-hidden="true" />
        </Button>
      }
    >
      <div className="rv-project-card__meta">
        <Badge tone={statusTone} dot>{status}</Badge>
        <span>{due}</span>
      </div>
      <div
        className="rv-progress"
        role="progressbar"
        aria-label={`${progress}% complete`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <div className="rv-project-card__footer">
        <div className="rv-avatar-stack" aria-label={`${members.length} project members`}>
          {members.slice(0, 3).map((member) => (
            <span className="rv-avatar" key={member} title={member}>{member.split(" ").map((part) => part[0]).join("")}</span>
          ))}
        </div>
        <button className="rv-text-link" type="button" onClick={onOpen}>
          Open project <ArrowUpRight size={14} aria-hidden="true" />
        </button>
      </div>
    </Card>
  );
}
