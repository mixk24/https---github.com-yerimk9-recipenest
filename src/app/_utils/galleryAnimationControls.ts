export function wrapForward(trigger, iteration) {
  iteration++;
  trigger.wrapping = true;
  trigger.scroll(trigger.start + 1);
}

export function wrapBackward(trigger, iteration) {
  iteration--;
  if (iteration < 0) {
    iteration = 9;
  }
  trigger.wrapping = true;
  trigger.scroll(trigger.end - 1);
}
