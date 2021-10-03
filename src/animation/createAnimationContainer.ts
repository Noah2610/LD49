import { Spritesheet } from "../spritesheet";
import {
    Animation,
    AnimationContainer,
    AnimationContainerConfig,
    createAnimation,
} from ".";

export function createAnimationContainer(
    spritesheet: Spritesheet,
    config: AnimationContainerConfig,
): AnimationContainer {
    const animations: AnimationContainer["animations"] = new Map();
    for (const animName in config.animations) {
        const animConfig = config.animations[animName]!;
        animations.set(animName, createAnimation(spritesheet, animConfig));
    }

    const currentAnimation = config.defaultAnimation ?? undefined;

    const expectAnim = (name: string): Animation => {
        const animation = container.animations.get(name);
        if (!animation) {
            throw new Error(
                `[expectAnim] Expected animation "${name}" to exist in animationContainer`,
            );
        }
        return animation;
    };

    const play: AnimationContainer["play"] = (animName) => {
        if (container.currentAnimation) {
            const anim = expectAnim(container.currentAnimation);
            anim.reset();
        }
        const anim = expectAnim(animName);
        container.currentAnimation = animName;
        anim.play();
    };

    const getCurrentAnimation: AnimationContainer["getCurrentAnimation"] =
        () => {
            if (!container.currentAnimation) return null;
            const animation = expectAnim(container.currentAnimation);
            return animation;
        };

    const container: AnimationContainer = {
        animations,
        currentAnimation,
        defaultAnimation: config.defaultAnimation,
        play,
        getCurrentAnimation,
    };

    if (currentAnimation) {
        container.play(currentAnimation);
    }

    return container;
}
