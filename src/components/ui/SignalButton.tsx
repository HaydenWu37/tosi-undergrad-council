"use client";

import { Button } from "@/components/ui/Button";

/**
 * The homepage's "magic moment": ripples a wave of light outward through
 * the neural network background. Decoupled from NeuralScene via a plain
 * DOM CustomEvent (`neural-cascade`) — neither needs to import the other,
 * and nothing breaks if the network isn't mounted yet or WebGL isn't
 * available (the event just has no listener).
 */
export function SignalButton({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Button
      variant="ghost"
      className={tone === "dark" ? "self-start !text-signal-300 hover:!text-white" : "self-start"}
      onClick={() => window.dispatchEvent(new CustomEvent("neural-cascade"))}
    >
      <span aria-hidden="true">✦</span> Send a signal
    </Button>
  );
}
